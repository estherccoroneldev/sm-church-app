import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {onDocumentCreated} from "firebase-functions/v2/firestore";

if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

exports.onNewEventCreated = onDocumentCreated("events/{eventId}",
  async (event) => {
    const snap = event.data;
    if (!snap) {
      console.log("No data associated with the event!");
      return null;
    }

    const newEvent = snap.data();
    const usersSnapshot = await db.collection("users").get();

    const tokens: string[] = [];
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.pushToken) {
        tokens.push(userData.pushToken);
      }
    });

    if (tokens.length === 0) {
      return null;
    }

    const message = {
      notification: {
        title: "📢 ¡Hay un nuevo evento!",
        body: newEvent.title,
      },
      tokens: tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log("Successfully sent message:", response.successCount);
      return null;
    } catch (error) {
      console.log("Error sending message:", error);
      return null;
    }
  });

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function"s options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
functions.setGlobalOptions({maxInstances: 5});
