import { createBottomTabNavigator, TransitionPresets } from '@react-navigation/bottom-tabs';
// import { StackScreenProps } from '@react-navigation/stack';

import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServingListScreen from 'screens/ministries-list-screen';
import { Event } from '../@types/event';
import { Ministry } from '../@types/ministry';
import { Sermon } from '../@types/sermon';
// import { HeaderButton } from '../components/HeaderButton';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ConnectDetailsScreen from 'screens/connect-details-screen';
import MinistryDetails from 'screens/ministry-details-screen';
import { TabBarIcon } from '../components/TabBarIcon';
import AboutUsScreen from '../screens/about-us-screen';
import { default as Connect } from '../screens/connect-screen';
import EventDetails from '../screens/event-details-screen';
import Events from '../screens/events-screen';
import Giving from '../screens/giving-screen';
import Home from '../screens/home-screen';
import MediaDetails from '../screens/media-details-screen';
import Media from '../screens/media-screen';
// import { RootStackParamList } from './root-stack-navigator';

const { width } = Dimensions.get('screen');
// type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export type HomeParamList = {
  Home: undefined;
  MinistryDetails: Ministry;
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
  MinistryDetails: Ministry;
  ConnectDetails: undefined;
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

const headerTitleStyle = {
  fontSize: 24,
  fontFamily: 'Outfit_600SemiBold',
} as const;

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
        component={Home}
      />
      <HomeStack.Screen
        name="MinistryDetails"
        options={{
          title: 'Detalles',
          headerTitleStyle,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={MinistryDetails}
      />
      {/* TO DO: should go to the Events Tab first (push -> A -> Tab B -> B) ? Analize later */}
      <HomeStack.Screen
        name="EventDetails"
        options={{
          title: 'Detalles del evento',
          headerTitleStyle,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={EventDetails}
      />
    </HomeStack.Navigator>
  );
}
export function EventsStackScreen() {
  return (
    <EventsStack.Navigator>
      <EventsStack.Screen
        name="Events"
        options={{
          title: 'Calendario',
          headerTitleStyle,
          headerShadowVisible: false,
        }}
        component={Events}
      />
      <EventsStack.Screen
        name="EventDetails"
        options={{
          title: 'Evento',
          headerTitleStyle,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={EventDetails}
      />
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
    <ConnectStack.Navigator>
      <ConnectStack.Screen
        options={{
          title: 'Conéctate',
          headerTitleStyle,
          headerShadowVisible: false,
        }}
        name="ConnectTab"
        component={Connect}
      />
      <ConnectStack.Screen
        options={{
          title: 'Conéctate',
          headerTitleStyle,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        name="ConnectDetails"
        component={ConnectDetailsScreen}
      />
      <ConnectStack.Screen
        name="MinistryDetails"
        options={{
          title: 'Detalles',
          headerTitleStyle,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={MinistryDetails}
      />
      <ConnectStack.Screen
        name="ServingList"
        options={{
          headerTitle: 'Ministerios',
          headerTitleStyle,
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
        }}
        component={ServingListScreen}
      />
      <ConnectStack.Screen
        name="AboutUs"
        options={{
          headerTitle: 'Sobre nosotros',
          headerTitleStyle,
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={AboutUsScreen}
      />
    </ConnectStack.Navigator>
  );
}

export default function TabLayout() {
  const { bottom } = useSafeAreaInsets();
  const tabOptions = {
    tabBarActiveTintColor: '#C6233F',
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 12 + bottom,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,
      elevation: 5,
      width: width * 0.915,
      height: 70,
      marginHorizontal: 16,
    },
    tabBarAllowFontScaling: true,
    tabBarHideOnKeyboard: true,
    tabBarIconStyle: {
      margin: 12,
    },
  } as const;

  return (
    <Tab.Navigator
      screenOptions={{
        ...tabOptions,
        ...TransitionPresets.ShiftTransition,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          title: '',
          headerShown: false,
          // TO DO: this button should be splitted out into a composed component, handle typos
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          // TO DO: it should be a button header that navigate to the profile screen
          // TO DO: add this button to the home screen header
          // headerRight: () => <HeaderButton onPress={() => navigation.navigate('Modal')} />,
          // headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="MediaStack"
        component={MediaStackScreen}
        options={{
          title: 'Media',
          headerTitleStyle,
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="video" color={color} />,
        }}
      />
      <Tab.Screen
        name="EventsStack"
        component={EventsStackScreen}
        options={{
          headerShown: false,
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
          title: '',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code-of-conduct" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
