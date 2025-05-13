import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServingListScreen from 'screens/serving-list-screen';
import { Event } from '../@types/event';
import { Sermon } from '../@types/sermon';
import { Serving } from '../@types/serving';
import { HeaderButton } from '../components/HeaderButton';
import { TabBarIcon } from '../components/TabBarIcon';
import AboutUsScreen from '../screens/about-us';
import { default as Connect } from '../screens/connect-screen';
import EventDetails from '../screens/event-details-screen';
import Events from '../screens/events-screen';
import Giving from '../screens/giving-screen';
import Home from '../screens/home-screen';
import MediaDetails from '../screens/media-details-screen';
import Media from '../screens/media-screen';
import ServingDetails from '../screens/serving-details-screen';
import { RootStackParamList } from './root-stack-navigator';

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export type HomeParamList = {
  Home: undefined;
  ServingDetails: Serving;
  EventDetails: Event;
};

export type EventsParamList = {
  Events: undefined;
  EventDetails: Event;
};

export type MediaParamList = {
  Media: undefined;
  MediaDetails: Sermon;
};

export type GivingParamList = {
  Giving: undefined;
};

export type ConnectParamList = {
  ConnectTab: undefined;
  AboutUs: undefined;
  ServingDetails: Serving;
  ServingList: undefined;
};

// Define the type for the Tab Navigator's parameter list
export type TabParamList = {
  HomeStack: NavigatorScreenParams<HomeParamList>;
  MediaStack: NavigatorScreenParams<MediaParamList>;
  EventsStack: NavigatorScreenParams<EventsParamList>;
  GivingStack: NavigatorScreenParams<GivingParamList>;
  ConnectStack: NavigatorScreenParams<ConnectParamList>;
};

const HomeStack = createNativeStackNavigator<HomeParamList>();
const EventsStack = createNativeStackNavigator<EventsParamList>();
const MediaStack = createNativeStackNavigator<MediaParamList>();
const GivingStack = createNativeStackNavigator<GivingParamList>();
const ConnectStack = createNativeStackNavigator<ConnectParamList>();

const Tab = createBottomTabNavigator<TabParamList>();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ServingDetails" component={ServingDetails} />
      {/* TO DO: should go to the Events Tab first (push -> A -> Tab B -> B) ? Analize later */}
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
export function ConnectStackScreen() {
  return (
    <ConnectStack.Navigator screenOptions={{ headerShown: false }}>
      <ConnectStack.Screen name="ConnectTab" component={Connect} />
      <ConnectStack.Screen name="ServingDetails" component={ServingDetails} />
      <ConnectStack.Screen name="ServingList" component={ServingListScreen} />
      <ConnectStack.Screen name="AboutUs" component={AboutUsScreen} />
    </ConnectStack.Navigator>
  );
}

export default function TabLayout({ navigation }: Props) {
  const tabOptions = {
    tabBarActiveTintColor: 'black',
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 16,
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
  } as const;

  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          title: '',
          headerShown: true,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // TO DO: it should be a button header that navigate to the profile screen
          // TO DO: add this button to the home screen header
          headerRight: () => <HeaderButton onPress={() => navigation.navigate('Modal')} />,
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="MediaStack"
        component={MediaStackScreen}
        options={{
          title: 'Media',
          headerTitleStyle: {
            fontSize: 32,
            fontFamily: 'Outfit_600SemiBold',
          },
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="video" color={color} />,
        }}
      />
      <Tab.Screen
        name="EventsStack"
        component={EventsStackScreen}
        options={{
          title: 'Calendar',
          headerTitleStyle: {
            fontSize: 32,
            fontFamily: 'Outfit_600SemiBold',
          },
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
        }}
      />
      {/* TO DO: Add on next version */}
      {/* <Tab.Screen
        name="GivingStack"
        component={GivingStackScreen}
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="ConnectStack"
        component={ConnectStackScreen}
        options={{
          title: 'Conéctate',
          headerShadowVisible: false,
          // TO DO: change this icon
          tabBarIcon: ({ color }) => <TabBarIcon name="code-of-conduct" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
