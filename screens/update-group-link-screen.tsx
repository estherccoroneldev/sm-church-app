import Clipboard from '@react-native-clipboard/clipboard';
import { RouteProp, useRoute } from '@react-navigation/native';
import { db } from 'config/firebase';
import { HomeParamList } from 'navigation/tab-navigator';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import { Button, SizableText, Text, TextArea, XStack, YStack } from 'tamagui';

type UpdateGroupLinkRouteProp = RouteProp<HomeParamList, 'UpdateMinistryGroupLink'>;

export const UpdateGroupLinkScreen: React.FC = () => {
  const { height, width } = useWindowDimensions();
  const { params } = useRoute<UpdateGroupLinkRouteProp>();
  const textAreaHeight = React.useMemo(() => Math.round(height * 0.8), [height]);
  const [value, setValue] = useState<string>(params.currentGroupLink || '');
  const [copied, setCopied] = useState<boolean>(false);
  const [busy, setBusy] = useState(false);
  const copiedTimeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimeout.current) {
        clearTimeout(copiedTimeout.current);
      }
    };
  }, []);

  const showCopied = useCallback(() => {
    setCopied(true);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT);
    }
    if (copiedTimeout.current) clearTimeout(copiedTimeout.current);
    copiedTimeout.current = setTimeout(() => setCopied(false), 1800) as unknown as number;
  }, []);

  const handleCopy = useCallback(async () => {
    if (!value) return;
    try {
      await Clipboard.setString(value);
      showCopied();
    } catch (err) {
      console.warn('Copy failed', err);
    }
  }, [value, showCopied]);

  const handlePaste = useCallback(async () => {
    try {
      const text = await Clipboard.getString();
      if (!text) return;
      setValue(text);
    } catch (err) {
      console.warn('Paste failed', err);
    }
  }, []);

  const handleClear = useCallback(() => {
    setValue('');
  }, []);

  const handleSave = useCallback(async () => {
    setBusy(true);
    try {
      await db.collection('ministries').doc(params.ministryId).update({
        groupLink: value,
      });
      // TO DO: update optimistically the store

      if (Platform.OS === 'android') {
        ToastAndroid.show('Saved', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.warn('Save failed', err);
    } finally {
      setBusy(false);
    }
  }, []);

  //   const charCount = value.length;
  //   const wordCount = useMemo(() => (value.trim() ? value.trim().split(/\s+/).length : 0), [value]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack flex={1} padding="$4" backgroundColor="$background" gap="$3">
          <YStack alignItems="center" gap="$2">
            <SizableText fontFamily={'$body'} fontSize={'$6'}>
              Actualice el enlace del grupo de WhatsApp
            </SizableText>
            <SizableText fontFamily="$body" fontSize={'$5'} color="$text" textAlign="center">
              Pegue o edite el enlace del grupo de WhatsApp aquí. Ejemplo:
              https://chat.whatsapp.com/… Asegúrese de que el enlace sea correcto antes de guardar.
            </SizableText>
          </YStack>

          <TextArea
            value={value}
            onChangeText={setValue}
            placeholder="Pegue o tipee el link del grupo aquí..."
            width={width - 32}
            height={textAreaHeight}
            borderRadius="$4"
            padding="$3"
            minHeight={120}
            alignSelf="center"
            fontSize={16}
            focusStyle={{ borderColor: '$borderColor', shadowColor: '$color' }}
            numberOfLines={12}
            // enable fast updates and avoid heavy re-renders
            enterKeyHint="done"
            spellCheck
            autoCorrect
          />

          <XStack justifyContent="space-between" alignItems="center">
            <XStack gap="$2">
              <Button size="$3" onPress={handleCopy} disabled={!value || busy}>
                Copy
              </Button>
              <Button size="$3" onPress={handlePaste} disabled={busy}>
                Paste
              </Button>
              <Button themeInverse size="$3" onPress={handleClear} disabled={!value || busy}>
                Clear
              </Button>
            </XStack>

            <XStack gap="$2" alignItems="center">
              {/* <Text fontSize={12} color="$colorMuted">
                {wordCount} words • {charCount} chars
              </Text> */}
              <Button
                size="$3"
                onPress={handleSave}
                disabled={busy}
                variant="outlined"
                backgroundColor={'$primary'}>
                {busy ? 'Saving...' : 'Save'}
              </Button>
            </XStack>
          </XStack>

          {copied ? (
            <YStack position="absolute" bottom={24} left={0} right={0} alignItems="center">
              <YStack backgroundColor="#000000bb" padding="$3" borderRadius="$4">
                <Text color="#fff">Copied</Text>
              </YStack>
            </YStack>
          ) : null}
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default UpdateGroupLinkScreen;
