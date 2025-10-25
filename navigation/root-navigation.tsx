import { createNavigationContainerRef } from '@react-navigation/native';
import { HomeParamList } from './tab-navigator';

export const navigationRef = createNavigationContainerRef<HomeParamList>();

export function navigate<RouteName extends keyof HomeParamList>(
  name: RouteName,
  params?: HomeParamList[RouteName]
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as any, params as any);
  } else {
    console.warn(`Navigation not ready. Attempted to navigate to ${name}.`);
  }
}
