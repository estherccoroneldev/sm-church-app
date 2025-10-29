import { db, firestore } from 'config/firebase';

export async function assignCoordinatorToMinistry(userId: string, ministryId: string) {
  if (!userId || !ministryId) {
    console.error('Invalid input: userId and ministryIds are required.');
    return { success: false, error: 'Invalid input' };
  }

  const userRef = db.collection('users').doc(userId);
  const ministryRef = db.collection('ministries').doc(ministryId);

  try {
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);
      const ministryDoc = await transaction.get(ministryRef);

      if (!userDoc.exists()) {
        throw new Error('User document does not exist!');
      }

      if (!ministryDoc.exists()) {
        throw new Error(`ministry with ID ${ministryId} does not exist!`);
      }

      const userData = userDoc.data();
      if (!userData) {
        throw new Error('User data is undefined!');
      }

      transaction.update(userRef, {
        ministries: firestore.FieldValue.arrayUnion(ministryRef),
        role: 'coordinator',
      });

      transaction.update(ministryRef, {
        coordinatorId: userId,
        acceptedMembers: firestore.FieldValue.arrayUnion(userData),
      });
    });

    console.log(`User ${userId} successfully signed up to accepted members:`, ministryId);
    return { success: true };
  } catch (error: Error | any) {
    console.error('Transaction failed: ', error.message);
    return { success: false, error: error.message };
  }
}
