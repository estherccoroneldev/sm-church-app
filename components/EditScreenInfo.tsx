import { useTranslation } from 'react-i18next';
import { YStack, H4, Paragraph } from 'tamagui';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const { t } = useTranslation();
  const title = t('getStarted');
  const description = t('changeCode');

  return (
    <YStack>
      <YStack alignItems="center" marginHorizontal="$6">
        <H4>{title}</H4>
        <YStack borderRadius="$3" marginVertical="$1">
          <Paragraph>{path}</Paragraph>
        </YStack>
        <Paragraph>{description}</Paragraph>
      </YStack>
    </YStack>
  );
};
