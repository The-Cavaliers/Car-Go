import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Drawer from './DrawerNav';
import { UserProfile } from './UserProfile';


const AppNavigator = StackNavigator({
<<<<<<< HEAD
  // Login: { screen: Login },
  // Profile: { screen: Profile },
=======
  //Profile: { screen: Profile },
>>>>>>> added tabs and moved the map to landing after login
  Drawer: { screen: Drawer },
  UserProfile: { screen: UserProfile },
});

// const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));
// export const navReducer = (state, action) => {
//   const nextState = AppNavigator.router.getStateForAction(action, state);
//   return nextState || state;
// };

export default AppNavigator;
