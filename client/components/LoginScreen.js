import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TextInput,
} from 'react-native';
import axios from 'axios';

import styles from '../css/style';
import CONFIG from '../../config/development.json';
import Profile from './ProfileScreen';
import Header from './ProfileHeader';

const Auth0Lock = require('react-native-lock');

const lock = new Auth0Lock({
  clientId: CONFIG.auth0.clientId,
  domain: CONFIG.auth0.domain,
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isPresent: false,
    }
  }

  componentWillMount() {
    this._login();
  }

  _login() {
    lock.show({}, (err, profile, token) => {
      if (err) {
        console.log(err);
        return;
      }
      // this.setState({ name: profile.name });
      console.log('profile:', profile);
      console.log('token:', token);
      console.log('provider', profile.identities[0].provider)
      axios.post('http://localhost:3000/sign-login', {
        username: profile.name,
        token: token.accessToken,
        email: profile.email,
        picture_url: profile.picture,
        provider: profile.identities[0].provider,
      })
      .then((response) => {
        // response from server, will need to et global state
        // response.data[0] object
        console.log('response from /sign-up server', response);
      })
      .catch((error) => {
        console.log('error from /sign-up', error);
      });
    });
  }

  render() {
    isPresent = this.state.isPresent;
    // return (isPresent) ? <HomePage /> : <Profile {...this.state} />;
    return (
      <View style={style.profilePage}>
        <Header headerText={this.state.name + "'s Profile"} />
        <Profile
          {...this.state}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const style = {
  profilePage: {
    height: '100%',
  },
};

export default Login;
