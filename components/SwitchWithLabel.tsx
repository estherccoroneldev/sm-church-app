import type { SizeTokens, SwitchProps } from 'tamagui';
import { Label, Separator, Switch, XStack } from 'tamagui';

interface SwitchWithLabelProps extends SwitchProps {
  size: SizeTokens;
  defaultChecked?: boolean;
  label?: string;
}

export function SwitchWithLabel(props: SwitchWithLabelProps) {
  const id = `switch-${props.size.toString().slice(1)}-${props.defaultChecked ?? ''}}`;
  return (
    <XStack alignItems="center" justifyContent="space-between" gap="$4" mt="$6">
      <Label
        paddingRight="$0"
        minWidth={90}
        maxWidth="70%"
        justifyContent="flex-end"
        size={props.size}
        fontFamily={'$body'}
        fontSize="$6"
        color="$text"
        htmlFor={id}>
        {props.label}
      </Label>
      <Switch id={id} defaultChecked={props.defaultChecked} {...props}>
        <Switch.Thumb animation="quick" />
      </Switch>
    </XStack>
  );
}
