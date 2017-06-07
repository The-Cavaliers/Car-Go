import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers/index';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router';


const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
// export const history = syncHistoryWithStore(browserHistory, store);
export default store;



// export const getLotes = (userId) => {
//   console.log ('getting lotes');
//   return function(dispatch, getState) {
//     var state = getState();
//     dispatch(loadingChanged(true));
//     return axios.get(`/api/profiles/${userId}/lotes`)
//       .then(function (res) {
//         dispatch(loadingChanged(false));
//         if (res.status === 200) {
//           console.log (res);
//           return res.data;
//         }
//         throw 'request failed';
//       })
//       .then(function (lotes) {
//         console.log ('received lotes', lotes);
//         dispatch(addLotesToStore(lotes));
//       })
//       .catch(function (err) {
//         console.log (err);
//       });
//   };
// };