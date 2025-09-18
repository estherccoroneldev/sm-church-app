import { db } from 'config/firebase';
import { arrayUnion, doc, runTransaction } from 'firebase/firestore';

export async function assignUserToMultipleMinistries(userId: string, ministryIds: string[]) {
  if (!userId || !ministryIds || ministryIds.length === 0) {
    console.error('Invalid input: userId and ministryIds are required.');
    return { success: false, error: 'Invalid input' };
  }

  const userRef = doc(db, 'users', userId);
  const ministriesRef = ministryIds.map((id) => doc(db, 'ministries', id));

  try {
    await runTransaction(db, async (transaction) => {
      // Read documents
      const userDoc = await transaction.get(userRef);
      const ministryDocs = await Promise.all(ministriesRef.map((ref) => transaction.get(ref)));

      // Validate existence
      if (!userDoc.exists()) {
        throw new Error('User document does not exist!');
      }
      ministryDocs.forEach((doc, index) => {
        if (!doc.exists()) {
          throw new Error(`ministry with ID ${ministryIds[index]} does not exist!`);
        }
      });

      // Update the user's document
      transaction.update(userRef, {
        ministries: arrayUnion(...ministriesRef),
        hasSelectedMinistries: 'yes',
      });

      // Update each ministry's document
      ministriesRef.forEach((minRef) => {
        transaction.update(minRef, {
          members: arrayUnion(userRef),
        });
      });
    });

    console.log(`User ${userId} successfully assigned to ministries:`, ministryIds);
    return { success: true };
  } catch (error: Error | any) {
    console.error('Transaction failed: ', error.message);
    return { success: false, error: error.message };
  }
}
