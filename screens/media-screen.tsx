import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, ButtonText } from 'tamagui';
import { ScreenContent } from '../components/ScreenContent';
import { MediaParamList } from '../navigation/tab-navigator';

type MediaScreenNavigationProp = NativeStackNavigationProp<MediaParamList, 'Media'>;

const Media: React.FC = () => {
  const navigation = useNavigation<MediaScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('MediaDetails', {
      id: 1,
      title: 'Media Title',
      description: 'Media Description',
      date: '2023-10-01',
    });
  };

  return (
    <ScreenContent path="screens/Media/index.tsx" title="Media Screen" backgroundColor="beige">
      <Button
        size="$4"
        onPress={handlePress}
        theme="alt1"
        backgroundColor="$background"
        color="$color"
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$2"
        padding="$2"
        margin="$2">
        <ButtonText>Go to Media Details Screen</ButtonText>
      </Button>
    </ScreenContent>
  );
};

export default Media;
