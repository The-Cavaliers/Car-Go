import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './client/store';
// import AppWithNavigationState from './client/components/AppWithNavigationState';
import AppNavigator from './client/components/routing';

const router = () => (
  <Provider store={store}>
    <AppNavigator />
    {/* <AppWithNavigationState /> */}
  </Provider>
);

AppRegistry.registerComponent('CarGo', () => router);
export default router;
