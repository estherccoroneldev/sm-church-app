import { RouteProp, useRoute } from '@react-navigation/native';
import { db, firestore } from 'config/firebase';
import { Formik } from 'formik';
import { AuthStackParamList } from 'navigation/auth-navigator';
import React from 'react';
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
import { RadioGroup, SizableText, Spinner, useTheme, YStack } from 'tamagui';
import { PrimaryButton } from 'tamagui.config';
import * as Yup from 'yup';
import { UserProfile } from '../@types/user';
import { CheckboxWithLabel } from '../components/CheckboxWithLabel';
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
    .matches(/^\+?[1-9]\d{1,14}$/, 'Número de teléfono no es válido')
    .required('Número de teléfono es requerido'),
  role: Yup.string().oneOf(['admin', 'member', 'coordinator', 'guest']).optional(),
  olderThan13Years: Yup.string().oneOf(['yes', 'no']).optional(),
  gender: Yup.string().oneOf(['male', 'female']).optional(),
});

const initialValues = {
  email: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  role: 'member',
  olderThan13Years: undefined,
  gender: undefined,
};

const TERMS_LINK = 'https://www.iglesiasanmateo.org/app-terms-and-privacy-policy.html';
const PRIVACY_LINK = 'https://www.iglesiasanmateo.org/pp-de-la-app-de-san-mateo.html';
// TO DO: accessibility: add labels to inputs, aria-labels
// TO DO: localization: translate strings to different languages

type RegisterByPhoneRouteProp = RouteProp<AuthStackParamList, 'RegisterByPhone'>;

const RegisterByPhone: React.FC = () => {
  const { params } = useRoute<RegisterByPhoneRouteProp>();
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const firstNameInputRef = React.useRef<TextInput>(null);
  const lastNameInputRef = React.useRef<TextInput>(null);
  const emailInputRef = React.useRef<TextInput>(null);
  const phoneNumberInputRef = React.useRef<TextInput>(null);

  const signIn = useAuth((state) => state.signIn);

  const handleSubmitForm = async (values: typeof initialValues, actions: any) => {
    // Client-side validation for olderThan13Years
    if (values.olderThan13Years !== 'yes') {
      setError('You must be older than 13 years to register.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const userDocRef = db.collection('users').doc(params.userId);
      const now = firestore.Timestamp.now();

      const initialUserProfile: UserProfile = {
        uid: params.userId,
        email: values.email || '',
        phoneNumber: values.phoneNumber || '',
        isPhoneVerified: true,
        role: values.role as 'admin' | 'member' | 'coordinator' | 'guest',
        firstName: values.firstName,
        lastName: values.lastName,
        acceptedTermsCond: 'yes',
        olderThan13Years: values.olderThan13Years,
        gender: values.gender ?? 'no information',
        createdAt: now,
        updatedAt: now,
      };

      await userDocRef.set(initialUserProfile, { merge: true });
      setMessage('User created successfully!');
      signIn({
        id: params.userId,
        name: `${values.firstName}`,
        role: values.role as 'admin' | 'member' | 'coordinator' | 'guest',
        isGuest: false,
      });

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
        backgroundColor: theme.background.get() as string,
      }}>
      <Formik
        initialValues={{ ...initialValues, phoneNumber: params.phoneNumber || '' }}
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
                    onSubmitEditing={() => firstNameInputRef.current?.focus()}
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
                    label="Teléfono"
                    editable={false}
                    returnKeyType="next"
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
                    label="Es mayor de 13 años?"
                    size="$4"
                    backgroundColor={'$tertiary'}
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
                    <SizableText color="green" mt={4}>
                      {message}
                    </SizableText>
                  ) : null}

                  {/* TO DO: Adds here the terms and conditions policies website link */}
                  <SizableText fontSize="$4" textAlign="center" marginBottom="$4" mt="$6">
                    Presionando en el botón "Guardar", usted acepta nuestros{' '}
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
                      values.olderThan13Years !== 'yes' || loading ? '$tertiary' : '#076CB5'
                    }
                    size={'$5'}>
                    Guardar
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

export default RegisterByPhone;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
});
