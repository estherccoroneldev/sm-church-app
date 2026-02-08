import storage from '@react-native-firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

/**
 * 1. Opens the image library using expo-image-picker.
 * 2. Uploads the selected image to Firebase Storage using RN Firebase's putFile().
 * @param uid The user's unique ID for file naming.
 * @returns The public download URL of the uploaded image.
 */
export async function uploadProfilePhoto(uid: string): Promise<string | null> {
  // 1. Check permissions and pick image
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Sorry, we need camera roll permissions to make this work!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 0.7,
  });

  if (result.canceled || !result.assets || result.assets.length === 0) {
    return null; // User cancelled
  }

  // Get the local file URI (must be an absolute local path for putFile)
  const localFilePath = result.assets[0].uri;

  // 2. Prepare storage path
  const storagePath = `users/${uid}/profile_photo_${Date.now()}.jpg`;
  const storageRef = storage().ref(storagePath);

  try {
    // 3. Upload file using putFile
    // putFile is optimized for local file URIs on the native filesystem.
    const task = storageRef.putFile(localFilePath);

    // Monitor upload progress (optional, but good practice)
    task.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress.toFixed(0)}% complete`);
    });

    // Wait for the upload to complete
    await task;

    // 4. Get the public download URL
    const downloadUrl = await storageRef.getDownloadURL();
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading photo with RN Firebase:', error);
    // Re-throw a specific error for the calling component to catch
    throw new Error('Failed to upload photo using @react-native-firebase/storage.');
  }
}
