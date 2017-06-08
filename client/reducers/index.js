import { combineReducers } from 'redux';
import loginProfile from './LoginProfileReducer';
import preferences from './ProfilePreferenceReducer';
import Drawer from '../components/navigation/DrawerNav';
import AppNavigator from '../components/navigation/routing';

const rootReducer = combineReducers({
  preferences,
  loginProfile,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state),
  drawer: (state, action) => Drawer.router.getStateForAction(action, state),
});

export default rootReducer;
