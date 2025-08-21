import React from 'react';

import { auth, db } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Formik } from 'formik';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'store/auth-store';
import { SizableText, Spinner, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import * as Yup from 'yup';
import { UserProfile } from '../@types/user';
import TextField from '../components/TextField';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('First Name is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid contact number format')
    .optional(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
};

// TO DO: accessibility: add labels to inputs, aria-labels
// TO DO: localization: translate strings to different languages
const Register: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const firstNameInputRef = React.useRef<TextInput>(null);
  const lastNameInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const phoneNumberInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);
  const confirmPasswordInputRef = React.useRef<TextInput>(null);

  const signIn = useAuth((state) => state.signIn);

  const handleSubmitForm = async (values: typeof initialValues, actions: any) => {
    // Ensure Firebase Auth and Firestore are initialized
    if (!auth || !db) {
      setError('Firebase services are not initialized. Please wait');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const now = Timestamp.now();

      const initialUserProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        phoneNumber: values.phoneNumber || '',
        role: 'member', // Default role
        firstName: values.firstName,
        lastName: values.lastName,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(userDocRef, initialUserProfile);
      setMessage('User created and profile saved successfully!');
      signIn({ id: user.uid, name: `${values.firstName}`, isGuest: false });

      actions.resetForm();
      actions.setSubmitting(false);
    } catch (err: any) {
      console.error('Error during sign-up or Firestore write:', err);
      // Handle Firebase Auth specific errors
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else if (err.code === 'auth/weak-password') {
        setError('The password is too weak. Please choose a stronger password.');
      } else {
        // Generic error for other issues (network, Firestore write errors, etc.)
        setError(err.message || 'Failed to create user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
      edges={['left', 'right', 'bottom']}>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmitForm}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled">
                <SizableText fontSize="$6" textAlign="center" marginBottom="$4">
                  Crea una cuenta para comenzar.
                </SizableText>
                <YStack flex={1} width="100%">
                  <TextField
                    label="First Name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    returnKeyType="next"
                    onSubmitEditing={() => lastNameInputRef.current?.focus()}
                    ref={firstNameInputRef}
                    value={values.firstName}
                    variant="primary"
                  />
                  {touched.firstName && errors.firstName ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.firstName}
                    </SizableText>
                  ) : null}

                  <TextField
                    label="Last Name"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    returnKeyType="next"
                    onSubmitEditing={() => emailInputRef.current?.focus()}
                    ref={lastNameInputRef}
                    value={values.lastName}
                    variant="primary"
                  />
                  {touched.lastName && errors.lastName ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.lastName}
                    </SizableText>
                  ) : null}

                  <TextField
                    label="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
                    ref={emailInputRef}
                    value={values.email}
                    variant="primary"
                  />
                  {touched.email && errors.email ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.email}
                    </SizableText>
                  ) : null}

                  <TextField
                    label="Phone Number"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
                    ref={phoneNumberInputRef}
                    value={values.phoneNumber}
                    variant="primary"
                  />
                  {touched.phoneNumber && errors.phoneNumber ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.phoneNumber}
                    </SizableText>
                  ) : null}

                  <TextField
                    label="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    returnKeyType="next"
                    onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
                    ref={passwordInputRef}
                    value={values.password}
                    secureTextEntry
                    variant="primary"
                  />
                  {touched.password && errors.password ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.password}
                    </SizableText>
                  ) : null}

                  <TextField
                    label="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    returnKeyType="done"
                    onSubmitEditing={() => handleSubmit()}
                    ref={confirmPasswordInputRef}
                    value={values.confirmPassword}
                    secureTextEntry
                    variant="primary"
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.confirmPassword}
                    </SizableText>
                  ) : null}

                  {error ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {error}
                    </SizableText>
                  ) : null}

                  {message ? (
                    <SizableText color="$green500" mt={4}>
                      {message}
                    </SizableText>
                  ) : null}
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    disabled={loading}
                    icon={loading ? <Spinner size="small" color="$background" /> : undefined}
                    mt={'$8'}
                    mb={'$2'}
                    size={'$5'}>
                    Crear Cuenta
                  </PrimaryButton>
                </YStack>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});

// {/* TO DO: Adds here the terms and conditions policies website link */}
// {/* <SizableText fontSize="$4" textAlign="center" marginBottom="$4">
//       By signing in, you agree to our Terms of Service and Privacy Policy.
//     </SizableText> */}
