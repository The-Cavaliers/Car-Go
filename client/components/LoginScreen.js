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
      axios.post('http://localhost:3000/sign-login', {
        username: profile.name,
        token: token.accessToken,
        email: profile.email,
        picture_url: profile.picture,
        provider: profile.identities[0].provider,
      })
      .then((response) => {
        // response from server, will need to add to global state
        // response.data[0] object will be boolean check
        console.log('response from /sign-up server', response);
        console.log(response.data[0])
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
