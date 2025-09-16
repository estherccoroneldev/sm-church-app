import type { SizeTokens } from 'tamagui';
import { Label, RadioGroup, XStack } from 'tamagui';

export function CheckboxWithLabel(props: { size: SizeTokens; value: string; label: string }) {
  const id = `radiogroup-${props.value}`;
  return (
    <XStack width={300} alignItems="center" gap="$4">
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} fontSize={'$5'} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  );
}
