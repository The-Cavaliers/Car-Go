import React from 'react';
import { AppRegistry } from 'react-native';
import App from './client/components/app';
import { Provider } from 'react-redux'
import store from './client/store';

const router = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('CarGo', () => router);
