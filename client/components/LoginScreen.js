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
import HomeScreen from './HomeScreen';

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
  static navigationOptions= ({navigation}) => ({
    title: 'Create Group',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Create Group',
  });
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
      console.log('profile:', profile);
      console.log('token:', token);
      axios.post(`${CONFIG.URL}/sign-login`, {
        username: profile.name,
        token: token.accessToken,
        email: profile.email,
        picture_url: profile.picture,
        provider: profile.identities[0].provider,
      })
      .then((response) => {
        // response from server, will need to add to global state
        // response.data[0] object will be boolean check
        console.log('response from /sign-up server', response.data[1][0]);
        console.log(response.data[0]);
        this.setState({ username: response.data[1][0].username });
        AsyncStorage.setItem('AsyncProfile', JSON.stringify(response.data[1][0]));
      })
      .catch((error) => {
        console.log('error from /sign-up', error);
      });
    });
  }

  render() {
    return (
      <View style={style.profilePage}>
        <HomeScreen/>
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
        //<Header headerText={`${this.state.username}'s Profile`} />
        //<Profile
          //{...this.props}
          // navigation={this.props.navigation}
        ///>
