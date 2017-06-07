<<<<<<< HEAD
import React from 'react';
import {
  View,
} from 'react-native';
import axios from 'axios';
import CONFIG from '../../config/development.json';

import GroupRow from './GroupRow';

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: ['one', 'two'],
    };
    this.selectGroup = this.selectGroup.bind(this);
  }

  selectGroup() {
    axios.post(`${CONFIG.URL}/select-group`);
  }

  render() {
    return (
      <View>
        {this.state.groups.map((key, index) => (
          <GroupRow
            roomId={key}
            key={index}
            {...this.props}
            {...this.state}
          />),
        )}
=======
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'; // inject data where we need

class Group extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.joinGroup = this.joinGroup.bind(this);
  }
  joinGroup() {
      

  }
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.joinGroup}>
          <Text>Join Group </Text>
        </TouchableOpacity>
>>>>>>> GeoCoder Configuration
      </View>
    );
  }
}
export default Group;
