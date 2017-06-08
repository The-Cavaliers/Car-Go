import { combineReducers } from 'redux';
import group from './group';
import loginProfile from './LoginProfileReducer';
import preferences from './ProfilePreferenceReducer';
import Drawer from '../components/DrawerNav';
import AppNavigator from '../components/routing';

const rootReducer = combineReducers({
  group,
  preferences,
  loginProfile,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state),
  drawer: (state, action) => Drawer.router.getStateForAction(action, state),
});

export default rootReducer;