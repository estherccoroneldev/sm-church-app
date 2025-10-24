import auth from '@react-native-firebase/auth';
import React from 'react';

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
import { SizableText, Spinner, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import * as Yup from 'yup';
import TextField from '../components/TextField';

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const initialValues = {
  email: '',
  password: '',
};

// TO DO: accessibility: add labels to inputs, aria-labels
// TO DO: localization: translate strings to different languages
const SignInScreen: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const emailInputRef = React.useRef<TextInput>(null);
  const passwordInputRef = React.useRef<TextInput>(null);

  const signIn = useAuth((state) => state.signIn);

  const handleSubmitForm = async (values: typeof initialValues, actions: any) => {
    // Ensure Firebase Auth is initialized
    if (!auth) {
      setError('Firebase services are not initialized. Please wait');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        values.email.trim(),
        values.password.trim()
      );
      const user = userCredential.user;

      setMessage('User signed in successfully!');

      // TO DO: sets the actual name from DB source
      signIn({
        id: user.uid,
        name: `${user.displayName ?? ''}`,
        isGuest: false,
      });

      actions.resetForm();
      actions.setSubmitting(false);
    } catch (err: any) {
      console.error('Error during sign-in:', err);
      // Handle Firebase Auth specific errors
      if (err.code === 'auth/email-already-in-use') {
        setError('The email address is already in use by another account.');
      } else if (err.code === 'auth/invalid-email') {
        setError('The email address is not valid.');
      } else {
        // Generic error for other issues (network, Firestore write errors, etc.)
        setError(err.message || 'Failed to sign in user. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
      }}
      edges={['left', 'right', 'bottom']}>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
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
                  Inicia sesión con tu correo y tu contraseña.
                </SizableText>
                <YStack flex={1} width="100%">
                  <TextField
                    label="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    returnKeyType="next"
                    onSubmitEditing={() => passwordInputRef.current?.focus()}
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
                    label="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    returnKeyType="done"
                    onSubmitEditing={() => handleSubmit()}
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

                  {error ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {error}
                    </SizableText>
                  ) : null}

                  {message ? (
                    <SizableText color="green" mt={4}>
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
                    Ingresar
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

export default SignInScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
