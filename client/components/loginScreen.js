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

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this._login = this._login.bind(this);
  }
  _login() {
    fetch('http://127.0.0.1:3000/mobile', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
    })
        .then(response => (response.json()))
        .then((res) => {
          if (res.success === true) {
            const username = res.message;
            AsyncStorage.setItem('username', username);
            this.props.navigation.navigate('Profile');
          } else {
            alert('no user found');
          }
        })
        .catch((err) => {
          alert(err);
        });
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 150, height: 150 }}
          source={require('../assets/carpool.png')}
        />
        <Text style={styles.welcome}> Carpool Application</Text>
        <View style={styles.inputContainer}>
          <TextInput
            underlineColorIos="transparent" style={styles.input}
            onChangeText={username => this.setState({ username })}
            value={this.state.username}
            placeholder="username"
          />
          <TextInput
            secureTextEntry={true}
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
            placeholder="password"
          />
          <TouchableOpacity onPress={this._login} style={styles.buttonContainer}>
            <Text style={styles.buttonText}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
