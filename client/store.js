import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router';


const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
// export const history = syncHistoryWithStore(browserHistory, store);
export default store;
