import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {
  onDocumentCreated,
  onDocumentUpdated,
} from "firebase-functions/v2/firestore";

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

exports.onNotifyCoordinatorNewPendingMember = onDocumentUpdated(
  "ministries/{ministryId}",
  async (event) => {
    const snap = event.data;
    if (!snap) {
      console.log("No data associated with the ministry!");
      return null;
    }

    const beforeData = snap.before.data();
    const afterData = snap.after.data();
    const ministryData = afterData;
    const ministryId = event.params.ministryId;

    const coordinatorId = ministryData.coordinatorId;
    const beforeMembers = beforeData.pendingMembers || [];
    const afterMembers = afterData.pendingMembers || [];

    const membersChanged =
      beforeMembers.length !== afterMembers.length ||
      JSON.stringify(
        beforeMembers.sort()) !== JSON.stringify(afterMembers.sort()
      );

    if (!membersChanged) {
      console.log("The \"pendingMembers\" array did not change. Exiting.");
      return null;
    }

    if (!coordinatorId) {
      console.log("No coordinatorId found for this ministry.");
      return null;
    }

    const coordinatorRef = db.collection("users").doc(coordinatorId);
    const coordinatorDoc = await coordinatorRef.get();

    if (!coordinatorDoc.exists) {
      console.log("Coordinator document does not exist.");
      return null;
    }
    const coordinatorData = coordinatorDoc.data();

    if (!coordinatorData || !coordinatorData.pushToken) {
      console.log("No push token found for the coordinator.");
      return null;
    }

    const message = {
      notification: {
        title: "📢 Nuevo miembro interesado!",
        body: `Hay un nuevo miembro pendiente de aprobación en el ministerio 
        ${ministryData.title}.`,
      },
      data: {
        ministryId: ministryId,
        changeType: "PENDING_MEMBER_ARRAY_UPDATED",
        newPendingMemberCount: String(afterMembers.length),
      },
      token: coordinatorData.pushToken,
    };

    try {
      const response = await admin.messaging().send(message);
      console.log("Successfully sent message to coordinator:", response);
      return null;
    } catch (error) {
      console.log("Error sending message to coordinator:", error);
      return null;
    }
  }
);

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
