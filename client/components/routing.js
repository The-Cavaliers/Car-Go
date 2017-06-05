import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Drawer from './DrawerNav';

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  // Profile: { screen: Profile },
  Drawer: { screen: Drawer },
});

export default AppNavigator;
