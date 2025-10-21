import { db } from 'config/firebase';
import { arrayUnion, doc, runTransaction } from 'firebase/firestore';

export async function signupUserToPendingMemberArray(userId: string, ministryId: string) {
  if (!userId || !ministryId) {
    console.error('Invalid input: userId and ministryIds are required.');
    return { success: false, error: 'Invalid input' };
  }

  const userRef = doc(db, 'users', userId);
  const ministryRef = doc(db, 'ministries', ministryId);

  try {
    await runTransaction(db, async (transaction) => {
      // Read documents
      const userDoc = await transaction.get(userRef);
      const ministryDoc = await transaction.get(ministryRef);

      // Validate existence
      if (!userDoc.exists()) {
        throw new Error('User document does not exist!');
      }

      if (!ministryDoc.exists()) {
        throw new Error(`ministry with ID ${ministryId} does not exist!`);
      }

      // Update the user's document
      // transaction.update(userRef, {
      //   ministries: arrayUnion(ministryRef),
      // });

      // Update each ministry's document
      transaction.update(ministryRef, {
        pendingMembers: arrayUnion(userRef),
      });
    });

    console.log(`User ${userId} successfully signed up to pending members:`, ministryId);
    return { success: true };
  } catch (error: Error | any) {
    console.error('Transaction failed: ', error.message);
    return { success: false, error: error.message };
  }
}
