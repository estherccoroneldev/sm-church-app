import { H2, Separator, Theme, YStack, YStackProps } from 'tamagui';

import { EditScreenInfo } from './EditScreenInfo';

interface ScreenContentProps extends YStackProps {
  title: string;
  path: string;
}

export const ScreenContent = ({ title, path, children, ...props }: ScreenContentProps) => {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center" {...props}>
        <H2>{title}</H2>
        <Separator />
        <EditScreenInfo path={path} />
        {children}
      </YStack>
    </Theme>
  );
};
