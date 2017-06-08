import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Drawer from './DrawerNav';
import { UserProfile } from './UserProfile';
import Groups from './Groups';

const AppNavigator = StackNavigator({
  // Login: { screen: Login },
  // Profile: { screen: Profile },
  Drawer: { screen: Drawer },
  UserProfile: { screen: UserProfile },
  Groups: { screen: Groups },
});

export default AppNavigator;
