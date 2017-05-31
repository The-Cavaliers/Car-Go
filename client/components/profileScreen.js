import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
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
      const uri = this.props.picture;
      return (
        <View style={styles.container}>
          <Text>Welcome Back {this.props.name}</Text>
          <TabBar />
        </View>
      );
    }
}

export default Profile;
