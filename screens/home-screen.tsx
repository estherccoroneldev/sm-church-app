import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, ButtonText } from 'tamagui';
import { ScreenContent } from '../components/ScreenContent';
import { HomeParamList } from '../navigation/tab-navigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<HomeParamList, 'Home'>;

const Home: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handlePress = () => {
    navigation.push('AnnouncementDetails', {
      id: 1,
      title: 'Announcement Title',
      description: 'Announcement Description',
      date: '2023-10-01',
    });
  };

  return (
    <ScreenContent path="screens/Home/index.tsx" title="Home Screen" backgroundColor="$blue10">
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
        <ButtonText>Go to Announcement Details Screen</ButtonText>
      </Button>
    </ScreenContent>
  );
};

export default Home;
