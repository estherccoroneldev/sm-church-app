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
        backgroundColor: '$primaryBackground',
        color: '$text',
        fontFamily: '$body',
        fontSize: '$6',
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
    <YStack>
      <SizableText my={'$2'} fontFamily={'$body'} color="#3E464B" fontSize={'$5'}>
        {label}
      </SizableText>
      <StyledTextInput
        ref={ref}
        {...props}
        style={[
          {
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
          },
          props.style,
        ]}
        variant={variant}
      />
    </YStack>
  );
};

export default TextField;
