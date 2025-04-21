import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '.';
import { HeaderButton } from '../components/HeaderButton';
import { TabBarIcon } from '../components/TabBarIcon';
import About from '../screens/about-screen';
import AnnouncementDetails from '../screens/announcement-details-screen';
import EventDetails from '../screens/event-details-screen';
import Events from '../screens/events-screen';
import Giving from '../screens/giving-screen';
import Home from '../screens/home-screen';
import MediaDetails from '../screens/media-details-screen';
import Media from '../screens/media-screen';

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export type HomeParamList = {
  Home: undefined;
  AnnouncementDetails: { id: number; title: string; description: string; date: string };
};

export type EventsParamList = {
  Events: undefined;
  EventDetails: { id: number; title: string; description: string; date: string };
};

export type MediaParamList = {
  Media: undefined;
  MediaDetails: { id: number; title: string; description: string; date: string };
};

export type GivingParamList = {
  Giving: undefined;
};

export type AboutParamList = {
  About: undefined;
};

// Define the type for the Tab Navigator's parameter list
export type TabParamList = {
  Home: NavigatorScreenParams<HomeParamList>;
  Media: NavigatorScreenParams<MediaParamList>;
  Events: NavigatorScreenParams<EventsParamList>;
  Giving: NavigatorScreenParams<GivingParamList>;
  About: NavigatorScreenParams<AboutParamList>;
};

const HomeStack = createNativeStackNavigator<HomeParamList>();
const EventsStack = createNativeStackNavigator<EventsParamList>();
const MediaStack = createNativeStackNavigator<MediaParamList>();
const GivingStack = createNativeStackNavigator<GivingParamList>();
const AboutStack = createNativeStackNavigator<AboutParamList>();

const Tab = createBottomTabNavigator<TabParamList>();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AnnouncementDetails" component={AnnouncementDetails} />
    </HomeStack.Navigator>
  );
}
export function EventsStackScreen() {
  return (
    <EventsStack.Navigator screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name="Events" component={Events} />
      <EventsStack.Screen name="EventDetails" component={EventDetails} />
    </EventsStack.Navigator>
  );
}
export function MediaStackScreen() {
  return (
    <MediaStack.Navigator screenOptions={{ headerShown: false }}>
      <MediaStack.Screen name="Media" component={Media} />
      <MediaStack.Screen name="MediaDetails" component={MediaDetails} />
    </MediaStack.Navigator>
  );
}
export function GivingStackScreen() {
  return (
    <GivingStack.Navigator screenOptions={{ headerShown: false }}>
      <GivingStack.Screen name="Giving" component={Giving} />
    </GivingStack.Navigator>
  );
}
export function AboutStackScreen() {
  return (
    <AboutStack.Navigator screenOptions={{ headerShown: false }}>
      <AboutStack.Screen name="About" component={About} />
    </AboutStack.Navigator>
  );
}

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // TO DO: it should be a button header that navigate to the profile screen
          headerRight: () => <HeaderButton onPress={() => navigation.navigate('Modal')} />,
        }}
      />
      <Tab.Screen
        name="Media"
        component={MediaStackScreen}
        options={{
          title: 'Media',
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={EventsStackScreen}
        options={{
          title: 'Events',
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tab.Screen
        name="Giving"
        component={GivingStackScreen}
        options={{
          title: 'Giving',
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutStackScreen}
        options={{
          title: 'About',
          // TO DO: change this icon
          tabBarIcon: ({ color }) => <TabBarIcon name="info-circle" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
