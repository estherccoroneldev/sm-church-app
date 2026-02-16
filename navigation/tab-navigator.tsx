import { createBottomTabNavigator, TransitionPresets } from '@react-navigation/bottom-tabs';

import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Group } from '@types/group';
import { ProfileButton } from 'components/ProfileButton';
import { Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AnnouncementDetails from 'screens/announcement-details-screen';
import GroupDetails from 'screens/group-details-screen';
import GroupsListScreen from 'screens/groups-list-screen';
import ServingListScreen from 'screens/ministries-list-screen';
import MinistryDetails from 'screens/ministry-details-screen';
import MinistryMembersListScreen from 'screens/ministry-members-list-screen';
import SelectMinistryCoordinatorScreen from 'screens/select-ministry-coordinator-screen';
import SignupMinistryConfirmScreen from 'screens/signup-ministry-confirm-screen';
import UpdateGroupLinkScreen from 'screens/update-group-link-screen';
import { useTheme } from 'tamagui';
import { Announcement } from '../@types/announcement';
import { Event } from '../@types/event';
import { Ministry, MinistryChangeType } from '../@types/ministry';
import { Sermon } from '../@types/sermon';
import { TabBarIcon } from '../components/TabBarIcon';
import AboutUsScreen from '../screens/about-us-screen';
import { default as Connect } from '../screens/connect-screen';
import EventDetails from '../screens/event-details-screen';
import Events from '../screens/events-screen';
import Giving from '../screens/giving-screen';
import Home from '../screens/home-screen';
import MediaDetails from '../screens/media-details-screen';
import Media from '../screens/media-screen';
import { RootStackParamList } from './root-stack-navigator';

const { width } = Dimensions.get('screen');
type Props = NativeStackNavigationProp<RootStackParamList, 'TabNavigator'>;

export type HomeParamList = {
  Home: undefined;
  MinistryDetails: {
    id: Ministry['id'];
    changeType?: MinistryChangeType;
  };
  MinistryMembersList: {
    id: Ministry['id'];
  };
  SignupMinistryConfirm: {
    userId: string;
    ministryId: string;
    ministryName: string;
  };
  UpdateMinistryGroupLink: {
    ministryId: Ministry['id'];
    currentGroupLink?: string;
  };
  SelectMinistryCoordinator: {
    ministryId: Ministry['id'];
  };
  EventDetails: {
    eventId: Event['id'];
  };
  AnnouncementDetails: {
    announcementId: Announcement['id'];
  };
};

export type EventsParamList = {
  Events: undefined;
  EventDetails: {
    eventId: Event['id'];
  };
};

export type AnnouncementsParamList = {
  Announcements: undefined;
  AnnouncementDetails: {
    announcementId: Announcement['id'];
  };
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
  MinistryDetails: {
    id: Ministry['id'];
    changeType?: MinistryChangeType;
  };
  MinistryMembersList: {
    id: Ministry['id'];
  };
  SignupMinistryConfirm: {
    userId: string;
    ministryId: string;
    ministryName: string;
  };
  UpdateMinistryGroupLink: {
    ministryId: Ministry['id'];
    currentGroupLink?: string;
  };
  SelectMinistryCoordinator: {
    ministryId: Ministry['id'];
  };
  ConnectDetails: undefined;
  ServingList: undefined;
  GroupsList: undefined;
  GroupDetails: {
    group: Group;
  };
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
  const { navigate } = useNavigation<Props>();
  const theme = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.get() as string,
        },
      }}>
      <HomeStack.Screen
        name="Home"
        options={{
          title: '',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.background.get() as string,
          },
          headerRight: () => <ProfileButton onPress={() => navigate('Modal')} />,
        }}
        component={Home}
      />
      <HomeStack.Screen
        name="MinistryDetails"
        options={{
          title: '',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={MinistryDetails}
      />
      <HomeStack.Screen
        name="SignupMinistryConfirm"
        options={{
          title: 'Confirmar',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={SignupMinistryConfirmScreen}
      />

      <HomeStack.Screen
        name="MinistryMembersList"
        options={{
          title: 'Miembros',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={MinistryMembersListScreen}
      />
      <HomeStack.Screen
        name="UpdateMinistryGroupLink"
        options={{
          title: 'Actualizar',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={UpdateGroupLinkScreen}
      />
      <HomeStack.Screen
        name="SelectMinistryCoordinator"
        options={{
          title: 'Seleccionar',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={SelectMinistryCoordinatorScreen}
      />

      {/* TO DO: should go to the Events Tab first (push -> A -> Tab B -> B) ? Analize later */}
      <HomeStack.Screen
        name="EventDetails"
        options={{
          title: '',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={EventDetails}
      />
      <HomeStack.Screen
        name="AnnouncementDetails"
        options={{
          title: '',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={AnnouncementDetails}
      />
    </HomeStack.Navigator>
  );
}

export function EventsStackScreen() {
  const theme = useTheme();
  return (
    <EventsStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.get() as string,
        },
      }}>
      <EventsStack.Screen
        name="Events"
        options={{
          title: 'Calendario',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
        }}
        component={Events}
      />
      <EventsStack.Screen
        name="EventDetails"
        options={{
          title: '',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
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
  const theme = useTheme();
  return (
    <ConnectStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.get() as string,
        },
      }}>
      <ConnectStack.Screen
        options={{
          title: '',
          headerShown: false,
        }}
        name="ConnectTab"
        component={Connect}
      />
      {/* <ConnectStack.Screen
        options={{
          title: 'Conéctate',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        name="ConnectDetails"
        component={ConnectDetailsScreen}
      /> */}
      <ConnectStack.Screen
        name="MinistryDetails"
        options={{
          title: '',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={MinistryDetails}
      />

      <ConnectStack.Screen
        name="MinistryMembersList"
        options={{
          title: 'Miembros',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={MinistryMembersListScreen}
      />

      <ConnectStack.Screen
        name="UpdateMinistryGroupLink"
        options={{
          title: 'Actualizar',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={UpdateGroupLinkScreen}
      />
      <ConnectStack.Screen
        name="SelectMinistryCoordinator"
        options={{
          title: 'Seleccionar',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={SelectMinistryCoordinatorScreen}
      />

      <ConnectStack.Screen
        name="SignupMinistryConfirm"
        options={{
          title: 'Confirmar',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerShadowVisible: false,
          headerBackButtonDisplayMode: 'minimal',
        }}
        component={SignupMinistryConfirmScreen}
      />

      <ConnectStack.Screen
        name="GroupsList"
        options={{
          headerTitle: 'Grupos',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
        }}
        component={GroupsListScreen}
      />

      <ConnectStack.Screen
        name="GroupDetails"
        options={{
          headerTitle: '',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
        }}
        component={GroupDetails}
      />

      <ConnectStack.Screen
        name="ServingList"
        options={{
          headerTitle: 'Ministerios',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerBackButtonDisplayMode: 'minimal',
          headerShadowVisible: false,
        }}
        component={ServingListScreen}
      />
      <ConnectStack.Screen
        name="AboutUs"
        options={{
          headerTitle: 'Conócenos',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
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
  const theme = useTheme();
  const tabOptions = {
    tabBarActiveTintColor: theme.secondary.get() as string,
    tabBarShowLabel: false,
    tabBarStyle: {
      backgroundColor: theme.tertiary.get() as string,
      position: 'absolute',
      bottom: 8 + bottom, // TO DO: test this change on iOS as well
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
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="MediaStack"
        component={MediaStackScreen}
        options={{
          title: 'Media',
          headerTitleStyle: {
            ...headerTitleStyle,
            color: theme.text.get() as string,
          },
          headerStyle: {
            backgroundColor: theme.background.get() as string,
          },
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
          headerShadowVisible: false,
          // headerRight: () => <HeaderButton onPress={() => navigation.navigate('Modal')} />,
          tabBarIcon: ({ color }) => <TabBarIcon name="code-of-conduct" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
