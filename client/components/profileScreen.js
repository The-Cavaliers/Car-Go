import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  AsyncStorage,
  Text
} from 'react-native';

import TabBar from './TabBar';
import styles from '../css/style';

class Profile extends Component {
    constructor (props) {
      super(props);
      this.state = {
          username: [],
      };
    }
    componentDidMount() {
        this._loadInitialState().done();
    }
    _loadInitialState = async() =>{
      let value = await AsyncStorage.getItem('username');
      if(value !== null) {
        this.setState({username: value});
      }
    };
    render() {
      return (
        <View style={styles.container}>
          <Text>Welcome {this.state.username}</Text>
          <TabBar />
        </View>
      );
    }
}

export default Profile;
