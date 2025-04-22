import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Button, ButtonText } from 'tamagui';
import { ScreenContent } from '../components/ScreenContent';
import { EventsParamList } from '../navigation/tab-navigator';

type EventsScreenNavigationProp = NativeStackNavigationProp<EventsParamList, 'Events'>;

const Events: React.FC = () => {
  const navigation = useNavigation<EventsScreenNavigationProp>();
  const handlePress = () => {
    navigation.navigate('EventDetails', {
      id: 1,
      title: 'Event Title',
      description: 'Event Description',
      date: '2023-10-01',
    });
  };

  return (
    <ScreenContent path="screens/Events/index.tsx" title="Events Screen" backgroundColor="$blue8">
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
        <ButtonText>Go to Event Details Screen</ButtonText>
      </Button>
    </ScreenContent>
  );
};

export default Events;
