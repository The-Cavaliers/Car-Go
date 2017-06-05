import React, { Component } from 'react';
import {
  AsyncStorage,
  Button,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { connect } from 'react-redux'; // inject data where we need
import CONFIG from '../../config/development.json';

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
    this.selectGroup = this.selectGroup.bind(this);
  }

  // need to uncomment for production

  // componentDidMount() {
  //   AsyncStorage.getItem('group', (err, response) => {
  //     this.setState({ groups: response });
  //   });
  // }

  selectGroup() {
    axios(`${CONFIG.URL}/select-group`, )
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.selectGroup}
          title="join group 1"
        />
        <Button
          onPress={this.selectGroup}
          title="join group 1"
        />
      </View>
    );
  }
}
export default Group;
