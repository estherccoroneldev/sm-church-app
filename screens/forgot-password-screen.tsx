import React from 'react';

import auth from '@react-native-firebase/auth';
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
import { SizableText, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import * as Yup from 'yup';
import TextField from '../components/TextField';

const ForgotScreenSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const initialValues = {
  email: '',
};

// TO DO: accessibility, add labels to inputs, aria-labels
// TO DO: localization, translate strings to different languages
const ForgotScreenScreen: React.FC = () => {
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const emailInputRef = React.useRef<TextInput>(null);

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
      await auth().sendPasswordResetEmail(values.email.trim());
      setMessage('Link enviado exitosamente!');

      actions.resetForm();
      actions.setSubmitting(false);
    } catch (err: any) {
      // TO DO: Handle Firebase errors
      console.error('Error during recover:', err);
      setError(err.message || 'Failed to send the link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background.get() as string,
        paddingTop: 100,
      }}
      edges={['left', 'right', 'bottom']}>
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotScreenSchema}
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
                  Ingrese su correo electrónico y le enviaremos un link para que pueda resetear su
                  contraseña.
                </SizableText>
                <YStack flex={1} width="100%">
                  <TextField
                    label=""
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    returnKeyType="done"
                    onSubmitEditing={() => handleSubmit()}
                    ref={emailInputRef}
                    value={values.email}
                    variant="primary"
                  />
                  {touched.email && errors.email ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.email}
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
                    mt={'$8'}
                    mb={'$2'}
                    size={'$5'}>
                    Enviar
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

export default ForgotScreenScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
