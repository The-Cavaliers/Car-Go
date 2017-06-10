import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/store';
// import AppWithNavigationState from './client/components/AppWithNavigationState';
import AppNavigator from './client/components/navigation/routing';
import ReduxThunk from 'redux-thunk';

const router = () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

AppRegistry.registerComponent('CarGo', () => router);
export default router;
