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


// class Login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//     };
//
//     this._login = this._login.bind(this);
//   }
//   componentWillMount() {
//     this.FbLogin();
//   }
//
//   _login() {
//     fetch('http://127.0.0.1:3000/mobile', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: this.state.username,
//         password: this.state.password,
//       }),
//     })
//         .then(response => (response.json()))
//         .then((res) => {
//           if (res.success === true) {
//             const username = res.message;
//             AsyncStorage.setItem('username', username);
//             this.props.navigation.navigate('Profile');
//           } else {
//             alert('no user found');
//           }
//         })
//         .catch((err) => {
//           alert(err);
//         });
//   }
//
//   FbLogin() {
//     lock.show({}, (err, profile, token) => {
//       if (err) {
//         console.log(err);
//         return;
//       }
//       // Authentication worked!
//       console.log('Logged in with Auth0!');
//     });
//   }
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Image
//           style={{ width: 150, height: 150 }}
//           source={require('../assets/carpool.png')}
//         />
//         <Text style={styles.welcome}> Carpool Application</Text>
//         <View style={styles.inputContainer}>
//           <TextInput
//             underlineColorIos="transparent" style={styles.input}
//             onChangeText={username => this.setState({ username })}
//             value={this.state.username}
//             placeholder="username"
//           />
//           <TextInput
//             secureTextEntry={true}
//             underlineColorIos="transparent"
//             style={styles.input}
//             onChangeText={password => this.setState({ password })}
//             value={this.state.password}
//             placeholder="password"
//           />
//           <TouchableOpacity onPress={this._login} style={styles.buttonContainer}>
//             <Text style={styles.buttonText}> Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

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
      console.log(this.props);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Profile
          {...this.state}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default Login;

