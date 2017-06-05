import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux'; // inject data where we need

import CONFIG from '../../config/development.json';
import Profile from './ProfileScreen';
import Header from './ProfileHeader';

// import { mapStateToProps, mapDispatchToProps } from './AppWithNavigationState';

const Auth0Lock = require('react-native-lock');

const lock = new Auth0Lock({
  clientId: CONFIG.auth0.clientId,
  domain: CONFIG.auth0.domain,
});

const mapStateToProps = (state) => {
  return {
    // profileDetails: state.profileDetails,
    state,
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
    this._login = this._login.bind(this);
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
      const provider = profile.identities[0].provider;
      const username = provider === 'auth0' ? profile.nickname : profile.name;
      const userLogin = {
        username,
        token: token.accessToken,
        email: profile.email,
        picture_url: profile.picture,
        provider,
      }
      console.log('USER LOGIN', userLogin)
      this.setState({ username });
      axios.post(`${CONFIG.URL}/sign-login`, userLogin)
      .then((response) => {
        AsyncStorage.setItem('AsyncProfile', JSON.stringify(response));
        // response from server, will need to add to global state
        // response.data[0] object will be boolean check
        console.log('response from /sign-up server', response.data[1][0]);
        console.log(response.data[0]); // check if is in db
      })
      .catch((error) => {
        console.log('error from /sign-up', error);
      });
    });
  }

  render() {
    return (
      <View style={style.profilePage}>
        <Header headerText={`${this.state.username}'s Profile`} />
        <Profile
          {...this.props}
          // navigation={this.props.navigation}
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

export default connect(mapStateToProps)(Login);
