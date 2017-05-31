import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TextInput,
} from 'react-native';

import styles from '../css/style';
import CONFIG from '../../config/development.json';
import Profile from './ProfileScreen';

const Auth0Lock = require('react-native-lock');

const lock = new Auth0Lock({
  clientId: CONFIG.auth0.clientId,
  domain: CONFIG.auth0.domain,
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  componentWillMount() {
    this.FbLogin();
  }

  FbLogin() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({ name: profile.name });
      console.log('profile:', profile);
      console.log('token:', token);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Profile
          {...this.state}
        />
      </View>
    );
  }
}

export default Login;
