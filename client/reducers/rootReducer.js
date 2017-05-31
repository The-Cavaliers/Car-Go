import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import group from './group';
import TabBar from '../components/TabBar';
import JoinGroup from '../components/JoinGroup';
import profileDetails from './profileDetails';

const rootReducer = combineReducers({
  user,
  group,
  profileDetails,
  tabBar: (state, action) => TabBar.router.getStateForAction(action, state),
  // tabOne: (state, action) => JoinGroup.router.getStateForAction(action, state),
  // routing: routerReducer,
});

export default rootReducer;

// this is confusing
