import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Announcement } from '../@types/announcement';
import { Event } from '../@types/event';
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
import { RootStackParamList } from './root-stack-navigator';

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export type HomeParamList = {
  Home: undefined;
  AnnouncementDetails: Announcement;
  EventDetails: Event;
};

export type EventsParamList = {
  Events: undefined;
  EventDetails: Event;
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
  HomeStack: NavigatorScreenParams<HomeParamList>;
  MediaStack: NavigatorScreenParams<MediaParamList>;
  EventsStack: NavigatorScreenParams<EventsParamList>;
  GivingStack: NavigatorScreenParams<GivingParamList>;
  AboutStack: NavigatorScreenParams<AboutParamList>;
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
      {/* TO DO: should go to the Events Tab first (push -> A -> Tab B -> B) ? Think later */}
      <HomeStack.Screen name="EventDetails" component={EventDetails} />
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
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.5,
          elevation: 4,
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          title: '',
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // TO DO: it should be a button header that navigate to the profile screen
          headerRight: () => <HeaderButton onPress={() => navigation.navigate('Modal')} />,
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="MediaStack"
        component={MediaStackScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="video" color={color} />,
        }}
      />
      <Tab.Screen
        name="EventsStack"
        component={EventsStackScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      <Tab.Screen
        name="GivingStack"
        component={GivingStackScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      />
      <Tab.Screen
        name="AboutStack"
        component={AboutStackScreen}
        options={{
          title: '',
          headerShown: false,
          // TO DO: change this icon
          tabBarIcon: ({ color }) => <TabBarIcon name="code-of-conduct" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
