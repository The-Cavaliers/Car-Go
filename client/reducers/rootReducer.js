import { combineReducers } from 'redux';
import group from './group';
import profileDetails from './profileDetails';
import { navReducer } from '../components/routing';
import Drawer from '../components/DrawerNav';
import AppNavigator from '../components/routing';

const rootReducer = combineReducers({
  group,
  profileDetails,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state),
  drawer: (state, action) => Drawer.router.getStateForAction(action, state),
});

export default rootReducer;

// this is confusing
