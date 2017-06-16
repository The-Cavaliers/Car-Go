import { combineReducers } from 'redux';
import loginProfile from './LoginProfileReducer';
import preferences from './ProfilePreferenceReducer';
import getChatId from './GetChatIdReducer';
import Drawer from '../components/navigation/DrawerNav';
import AppNavigator from '../components/navigation/routing';
import roomId from './GetRoomIdReducer';

// store
const rootReducer = combineReducers({
  preferences,
  loginProfile,
  getChatId,
  roomId,
  nav: (state, action) => AppNavigator.router.getStateForAction(action, state),
  drawer: (state, action) => Drawer.router.getStateForAction(action, state),
});

export default rootReducer;
