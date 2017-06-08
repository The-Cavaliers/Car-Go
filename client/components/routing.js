import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Drawer from './DrawerNav';

const AppNavigator = StackNavigator({
  Drawer: { screen: Drawer },
});

export default AppNavigator;
