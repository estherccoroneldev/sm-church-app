import React from 'react';

import { CheckboxWithLabel } from 'components/CheckboxWithLabel';
import { auth, db } from 'config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { Formik } from 'formik';
import {
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from 'store/auth-store';
import { RadioGroup, SizableText, Spinner, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import * as Yup from 'yup';
import { UserProfile } from '../@types/user';
import { SwitchWithLabel } from '../components/SwitchWithLabel';
import TextField from '../components/TextField';

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required('Nombre es requerido'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Apellido es requerido'),
  email: Yup.string().email('Invalid email address').required('Email es requerido'),
  phoneNumber: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, 'Telefono no es válido')
    .optional(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Contraseña es requerida'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirmar contraseña es requerida'),
  role: Yup.string().oneOf(['admin', 'member', 'apprentice', 'guest']).optional(),
  olderThan13Years: Yup.string().oneOf(['yes', 'no']).optional(),
  knowMoreAboutMinistries: Yup.string().oneOf(['yes', 'no']).optional(),
  gender: Yup.string().oneOf(['male', 'female']).optional(),
});

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  role: 'guest',
  olderThan13Years: undefined,
  knowMoreAboutMinistries: undefined,
  gender: undefined,
};

const TERMS_LINK = 'https://www.iglesiasanmateo.org/app-terms-and-privacy-policy.html';
const PRIVACY_LINK = 'https://www.iglesiasanmateo.org/pp-de-la-app-de-san-mateo.html';
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
    // Client-side validation for olderThan13Years
    if (values.olderThan13Years !== 'yes') {
      setError('You must be older than 13 years to register.');
      return;
    }

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
        role: values.role as 'admin' | 'member' | 'apprentice' | 'guest',
        firstName: values.firstName,
        lastName: values.lastName,
        acceptedTermsCond: 'yes',
        olderThan13Years: values.olderThan13Years,
        knowMoreAboutMinistries: values.knowMoreAboutMinistries,
        gender: values.gender,
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
      }}>
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={handleSubmitForm}>
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView
                contentContainerStyle={styles.scrollViewContent}
                keyboardShouldPersistTaps="handled">
                <SizableText fontSize="$6" textAlign="center" marginBottom="$4">
                  Por favor, llena este formulario para crear una cuenta en nuestro sistema.
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
                    label="Contraseña"
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
                    label="Confirme su contraseña"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    returnKeyType="done"
                    onSubmitEditing={() => firstNameInputRef.current?.focus()}
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
                  {touched.firstName && errors.firstName ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.firstName}
                    </SizableText>
                  ) : null}

                  <TextField
                    label="Apellido"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    returnKeyType="next"
                    onSubmitEditing={() => phoneNumberInputRef.current?.focus()}
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
                    label="Teléfono (opcional)"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    returnKeyType="next"
                    onSubmitEditing={() => handleSubmit()}
                    ref={phoneNumberInputRef}
                    value={values.phoneNumber}
                    variant="primary"
                  />
                  {touched.phoneNumber && errors.phoneNumber ? (
                    <SizableText color="red" fontFamily={'$body'} fontSize="$5" mt={4}>
                      {errors.phoneNumber}
                    </SizableText>
                  ) : null}
                  <YStack>
                    <SizableText fontSize="$6" marginBottom="$2" mt="$6">
                      Seleccione su género (opcional)
                    </SizableText>
                    <RadioGroup aria-labelledby="Select a gender" name="Genero (opcional)">
                      <YStack gap="$2">
                        <CheckboxWithLabel size="$4" value="male" label="Masculino" />
                        <CheckboxWithLabel size="$4" value="female" label="Femenino" />
                      </YStack>
                    </RadioGroup>
                  </YStack>

                  <SwitchWithLabel
                    label="Es miembro activo de la Iglesia?"
                    size="$2"
                    onCheckedChange={(value) => {
                      handleChange('role')(value ? 'member' : 'guest');
                    }}
                  />
                  {/* TO DO: Adds select component and multi items depends on selected or deselectedm
                      It should have the ability to select max. 4 ministries from the list. 
                      It should be disabled if the role is not 'member'
                      It should be able to delete items from the selected list (ListItem/Chip with delete icon)
                  */}
                  {values.role === 'member' ? (
                    <SizableText fontSize="$5" marginBottom="$2" mt="$2">
                      Gracias por ser un miembro activo de nuestra iglesia!
                    </SizableText>
                  ) : null}
                  {/* ministryId field (select max. 4) => ref - string */}

                  <SwitchWithLabel
                    label="Le gustaría saber más sobre los ministerios?"
                    size="$2"
                    onCheckedChange={(value) => {
                      handleChange('knowMoreAboutMinistries')(value ? 'yes' : 'no');
                    }}
                  />

                  <SwitchWithLabel
                    label="Es mayor de 13 años?"
                    size="$2"
                    onCheckedChange={(value) => {
                      handleChange('olderThan13Years')(value ? 'yes' : 'no');
                    }}
                  />

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

                  {/* TO DO: Adds here the terms and conditions policies website link */}
                  <SizableText fontSize="$4" textAlign="center" marginBottom="$4" mt="$6">
                    Presionando en el botón "Crear Cuenta", usted acepta nuestros{' '}
                    <SizableText
                      fontFamily={'$heading'}
                      fontSize="$4"
                      color="#5EA1CA"
                      textDecorationLine="underline"
                      onPress={() => {
                        // Open terms of service link
                        Linking.openURL(TERMS_LINK);
                      }}>
                      Términos de Servicio
                    </SizableText>{' '}
                    y{' '}
                    <SizableText
                      fontFamily={'$heading'}
                      fontSize="$4"
                      color="#5EA1CA"
                      textDecorationLine="underline"
                      onPress={() => {
                        // Open privacy policy link
                        Linking.openURL(PRIVACY_LINK);
                      }}>
                      Políticas de Privacidad.
                    </SizableText>
                  </SizableText>
                  <PrimaryButton
                    onPress={() => handleSubmit()}
                    disabled={values.olderThan13Years !== 'yes' || loading}
                    icon={loading ? <Spinner size="small" color="$background" /> : undefined}
                    mt={'$6'}
                    mb={'$4'}
                    backgroundColor={
                      values.olderThan13Years !== 'yes' || loading ? '$gray500' : '#076CB5'
                    }
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
