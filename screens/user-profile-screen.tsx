import { db } from 'config/firebase';
import { Formik } from 'formik';
import { useCallback, useState } from 'react';
import * as yup from 'yup';

import { uploadProfilePhoto } from '../services/upload-profile-photo';

import { useAuthStore } from 'store/auth-store';
import { Button, H3, Image, Input, Spinner, Square, Text, Theme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';

interface ProfileFormValues {
  firstName: string;
  lastName: string;
}

export const profileSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'Must be at least 2 characters'),
  lastName: yup.string().required('Last Name is required').min(2, 'Must be at least 2 characters'),
  // We don't validate the photo path here as it's optional and handled separately
});

export function UserProfileScreen() {
  const { setUserData, updateAvatarUrl, userData: user } = useAuthStore();
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);

  if (!user) {
    return <Text>Loading User Data...</Text>;
  }

  // --- HANDLERS ---

  // ** 1. Photo Picker Handler **
  const handlePhotoUpload = useCallback(async () => {
    if (!user.uid) return;

    setIsPhotoUploading(true);
    try {
      const avatarUrl = await uploadProfilePhoto(user.uid);
      if (avatarUrl) {
        await db.collection('users').doc(user.uid).update({ avatarUrl });

        updateAvatarUrl(avatarUrl);
      }
    } catch (error) {
      console.error(`Photo update failed: ${(error as Error).message}`);
    } finally {
      setIsPhotoUploading(false);
    }
  }, [user.uid, updateAvatarUrl]);

  // ** 2. Form Submission Handler **
  const handleUpdateProfile = useCallback(
    async (values: ProfileFormValues, actions: any) => {
      actions.setSubmitting(true);
      try {
        await db.collection('users').doc(user.uid).update({
          firstName: values.firstName,
          lastName: values.lastName,
        });

        // Update Zustand Store
        setUserData({ ...user, ...values });

        console.info('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
        console.error('Failed to update profile.');
      } finally {
        actions.setSubmitting(false);
      }
    },
    [user, setUserData]
  );

  // --- RENDER ---
  const initialValues: ProfileFormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return (
    <Theme name="light">
      <YStack flex={1} paddingHorizontal="$4" paddingTop="$10" backgroundColor="$background">
        <H3 marginBottom="$5" textAlign="center">
          Edit Profile
        </H3>

        {/* --- Profile Photo Section --- */}
        <YStack alignItems="center" marginBottom="$6">
          <Square size={120} borderRadius="$12" overflow="hidden" backgroundColor="$gray5">
            {user.avatarUrl ? (
              <Image
                source={{ uri: user.avatarUrl }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Text fontSize="$6" color="$gray10">
                No Photo
              </Text>
            )}
          </Square>

          <Button
            marginTop="$2"
            size="$3"
            onPress={handlePhotoUpload}
            disabled={isPhotoUploading}
            icon={isPhotoUploading ? () => <Spinner size="small" /> : undefined}>
            {isPhotoUploading ? 'Uploading...' : 'Change Photo'}
          </Button>
        </YStack>

        {/* --- Formik / Name Fields Section --- */}
        <Formik
          initialValues={initialValues}
          validationSchema={profileSchema}
          onSubmit={handleUpdateProfile}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
            <YStack space="$4">
              {/* First Name Input */}
              <YStack>
                <Input
                  size="$4"
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <Text color="$red10" fontSize="$2" marginTop="$1">
                    {errors.firstName}
                  </Text>
                )}
              </YStack>

              {/* Last Name Input */}
              <YStack>
                <Input
                  size="$4"
                  placeholder="Last Name"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <Text color="$red10" fontSize="$2" marginTop="$1">
                    {errors.lastName}
                  </Text>
                )}
              </YStack>

              {/* Submit Button */}
              <PrimaryButton
                marginTop="$4"
                size="$5"
                // theme="active"
                onPress={handleSubmit as any}
                disabled={isSubmitting}
                icon={isSubmitting ? () => <Spinner size="small" /> : undefined}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </PrimaryButton>
            </YStack>
          )}
        </Formik>
      </YStack>
    </Theme>
  );
}
