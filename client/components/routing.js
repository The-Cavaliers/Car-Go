import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Drawer from './DrawerNav';

const AppNavigator = StackNavigator({
  Drawer: { screen: Drawer },
  //UserProfile: { screen: UserProfile },
});

export default AppNavigator;
