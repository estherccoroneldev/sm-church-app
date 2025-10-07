import React, { PropsWithChildren } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { SizableText, styled, YStack } from 'tamagui';

const StyledTextInput = styled(TextInput, {
  name: 'TextField',
  variants: {
    variant: {
      default: {
        borderColor: '$borderColor',
        backgroundColor: '$background',
      },
      primary: {
        borderColor: '#3E464B',
        borderBottomWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor: '$background',
        color: '$text',
        fontFamily: '$body',
        fontSize: '$6',
        paddingVertical: 4,
      },
    },
  },
});

export type TextFieldProps = PropsWithChildren<TextInputProps> & {
  label: string;
  ref?: React.Ref<TextInput> | undefined;
  variant?: 'default' | 'primary';
};

const TextField: React.FC<TextFieldProps> = ({ variant = 'default', label, ref, ...props }) => {
  return (
    <YStack mt="$4">
      <SizableText my="$2" fontFamily={'$body'} color="$text" fontSize={'$6'}>
        {label}
      </SizableText>
      <StyledTextInput ref={ref} {...props} style={[{}, props.style]} variant={variant} />
    </YStack>
  );
};

export default TextField;
