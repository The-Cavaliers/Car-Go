import { StackNavigator } from 'react-navigation';
import Login from './LoginScreen';
import Drawer from './DrawerNav';


const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Drawer: { screen: Drawer },
});

export default AppNavigator;
