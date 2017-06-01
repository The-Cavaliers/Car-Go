import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
} from 'react-native';

import TabBar from './TabBar';
import styles from '../css/style';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
    };
    this.loadHomeScreen = this.loadHomeScreen.bind(this);
  }
  loadHomeScreen() {
    this.props.navigation.navigate('Drawer');
  }
  render() {
      // const uri = this.props.picture;
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={this.loadHomeScreen} style={styles.buttonContainer}>
            <Text>Welcome Back </Text>
          </TouchableOpacity>
          <TabBar />
        </View>
    );
  }
  // add for commit
}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 50,
//     backgroundColor: '#1abc9c ',
//   },
//   input: {
//     height: 40,
//     marginBottom: 20,
//   },
// });

export default Profile;
