import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  AsyncStorage,
  TextInput,
  AppRegistry
} from 'react-native';

const styles = {
  profilePageStyle: {
    backgroundColor: '#1abc9c',
  },
  userInput: {
    height: 30,
    borderColor: 'gray',
    margin: 10,
    paddingLeft: 30,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
};

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View style={{ padding: 10 }}>
        <Text>UserName</Text>
        <TextInput
          style={styles.userInput}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder="enter details"
        />
      </View>
    );
  }
}

module.exports.UserProfile = UserProfile;
export default UserProfile;
