import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Login from './LoginScreen';
import Drawer from './DrawerNav';
import { UserProfile } from './UserProfile';


const AppNavigator = StackNavigator({
  // Login: { screen: Login },
  // Profile: { screen: Profile },
  Drawer: { screen: Drawer },
  UserProfile: { screen: UserProfile },
});

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
// export const navReducer = (state, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//   return nextState || state;
// };

export default AppNavigator;
