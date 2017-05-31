import { createStore, compose } from 'redux';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router';

import rootReducer from './reducers/rootReducer';

const defaultState = {
  user: '',
  group: '',
  profileDetails: '',
};
const store = createStore(rootReducer, defaultState);
// export const history = syncHistoryWithStore(browserHistory, store);
export default store;
