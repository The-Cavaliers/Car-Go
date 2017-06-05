import { createStore } from 'redux';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

const defaultState = {
  group: '',
  profileDetails: {
    username: '',
    email: '',
    id: '',
    picture_url: '',
    social_provider: '',
    token: '',
  },
};
const store = createStore(rootReducer, defaultState);
// export const history = syncHistoryWithStore(browserHistory, store);
export default store;
