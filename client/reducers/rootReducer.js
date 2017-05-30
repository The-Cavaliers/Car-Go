import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './user';
import group from './group';
import TabBar from '../components/TabBar';
import JoinGroup from '../components/JoinGroup';

const rootReducer = combineReducers({
  user,
  group,

  tabBar: (state, action) => TabBar.router.getStateForAction(action, state),
  // tabOne: (state, action) => JoinGroup.router.getStateForAction(action, state),

  // routing: routerReducer,
});

export default rootReducer;

// this is confusing
