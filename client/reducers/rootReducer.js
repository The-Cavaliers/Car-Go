import { combineReducers } from 'redux';
import group from './group';
import profileDetails from './profileDetails';
import { navReducer } from '../components/routing';

const rootReducer = combineReducers({
  group,
  profileDetails,
  // tabBar: (state, action) => TabBar.router.getStateForAction(action, state),
  // tabOne: (state, action) => JoinGroup.router.getStateForAction(action, state),
  // routing: routerReducer,
  // nav: (state, action) => (
  //   routing.router.getStateForAction(action, state)
  // )
  nav: navReducer,
});

export default rootReducer;

// this is confusing
