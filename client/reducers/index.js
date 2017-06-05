import { combineReducers } from 'redux';
import group from './group';
import profileDetails from './profileDetails';
import Drawer from '../components/DrawerNav';
import AppNavigator from '../components/routing';
import preferences from './ProfilePreferenceReducer';

const rootReducer = combineReducers({
  group,
  preferences,
  profileDetails,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state),
  drawer: (state, action) => Drawer.router.getStateForAction(action, state),
});

export default rootReducer;
