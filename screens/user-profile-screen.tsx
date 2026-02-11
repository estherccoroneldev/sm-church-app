import { db } from 'config/firebase';
import { Formik } from 'formik';
import React, { useCallback, useState } from 'react';
import * as yup from 'yup';

import { uploadProfilePhoto } from '../services/upload-profile-photo';

import { FontAwesome } from '@expo/vector-icons';
import TextField from 'components/TextField';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from 'store/auth-store';
import { Avatar, H3, ScrollView, SizableText, Spinner, Text, useTheme, YStack } from 'tamagui';
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
  const theme = useTheme();

  const { setUserData, updateAvatarUrl, userData: user, isGuest } = useAuthStore();
  const userFB = useAuthStore((state) => state.user);
  const signOutAuth = useAuthStore((state) => state.signOut);

  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const firstNameInputRef = React.useRef<TextInput>(null);
  const lastNameInputRef = React.useRef<TextInput>(null);

  const handleRedirectToLogin = async () => {
    try {
      signOutAuth();
    } catch (error) {
      console.error('Error signing out:', JSON.stringify(error));
    }
  };

  if (!user || userFB?.isAnonymous || (userFB && isGuest)) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.background.get() as string,
          justifyContent: 'center',
          padding: 50,
        }}>
        <PrimaryButton
          size="$5"
          mt="$6"
          mb="$2"
          fontSize={'$6'}
          onPress={handleRedirectToLogin}
          pressStyle={{ opacity: 0.9 }}>
          Iniciar Sesión
        </PrimaryButton>
      </SafeAreaView>
    );
  }

  const handlePhotoUpload = useCallback(async () => {
    if (!user?.uid) return;

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

  const handleUpdateProfile = useCallback(
    async (values: ProfileFormValues, actions: any) => {
      actions.setSubmitting(true);
      try {
        await db.collection('users').doc(user.uid).update({
          firstName: values.firstName,
          lastName: values.lastName,
        });

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

  const initialValues: ProfileFormValues = {
    firstName: user.firstName,
    lastName: user.lastName,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollViewContent}
            keyboardShouldPersistTaps="handled">
            <YStack flex={1} px="$4" backgroundColor="$background">
              <H3 pb="$4" textAlign="center">
                Editar Perfil
              </H3>

              <YStack flex={1} alignItems="center" mb="$2" gap="$2">
                <TouchableOpacity onPress={handlePhotoUpload}>
                  <Avatar circular size="$10">
                    <Avatar.Image accessibilityLabel="profile-photo" src={user.avatarUrl} />
                    <Avatar.Fallback delayMs={600} backgroundColor="$gray5" />
                  </Avatar>
                  <YStack position="absolute" bottom={0} right={10}>
                    <FontAwesome name="edit" size={24} color={'#333333'} />
                  </YStack>
                </TouchableOpacity>
                {isPhotoUploading ? (
                  <SizableText size={'$3'}>La foto se está cargando...</SizableText>
                ) : null}
              </YStack>

              <Formik
                initialValues={initialValues}
                validationSchema={profileSchema}
                onSubmit={handleUpdateProfile}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  isSubmitting,
                }) => (
                  <>
                    <YStack>
                      {/* First Name Input */}
                      <TextField
                        label="Nombre"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        returnKeyType="next"
                        onSubmitEditing={() => lastNameInputRef.current?.focus()}
                        ref={firstNameInputRef}
                        value={values.firstName}
                        variant="primary"
                      />
                      {errors.firstName && touched.firstName && (
                        <Text color="$red10" fontSize="$2" marginTop="$1">
                          {errors.firstName}
                        </Text>
                      )}
                    </YStack>

                    {/* Last Name Input */}
                    <YStack>
                      <TextField
                        label="Apellido"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        returnKeyType="next"
                        ref={lastNameInputRef}
                        value={values.lastName}
                        variant="primary"
                      />
                      {errors.lastName && touched.lastName && (
                        <Text color="$red10" fontSize="$2" marginTop="$1">
                          {errors.lastName}
                        </Text>
                      )}
                    </YStack>

                    {/* Submit Button */}
                    <PrimaryButton
                      my="$6"
                      size="$5"
                      onPress={() => handleSubmit()}
                      disabled={isSubmitting}
                      icon={
                        isSubmitting
                          ? () => <Spinner size="small" color="$background" />
                          : undefined
                      }>
                      {isSubmitting ? 'Guardando...' : 'Guardar'}
                    </PrimaryButton>
                  </>
                )}
              </Formik>
            </YStack>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
