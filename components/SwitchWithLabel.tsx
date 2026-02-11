import type { SizeTokens, SwitchProps } from 'tamagui';
import { Label, Switch, XStack } from 'tamagui';

interface SwitchWithLabelProps extends SwitchProps {
  size: SizeTokens;
  defaultChecked?: boolean;
  label?: string;
}

export function SwitchWithLabel(props: SwitchWithLabelProps) {
  return (
    <XStack alignItems="center" justifyContent="space-between" gap="$4" mt="$6">
      <Label
        paddingRight="$0"
        minWidth={90}
        maxWidth="70%"
        justifyContent="flex-end"
        size={props.size}
        fontFamily={'$body'}
        fontSize="$5"
        color="$text">
        {props.label}
      </Label>
      <Switch defaultChecked={props.defaultChecked} {...props}>
        <Switch.Thumb animation="bouncy" backgroundColor={props.checked ? '$primary' : '$text'} />
      </Switch>
    </XStack>
  );
}
