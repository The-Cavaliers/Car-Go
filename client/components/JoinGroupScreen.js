import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from '../css/style';

export default class JoinGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      groupsView: false,
      LeavingFrom: '',
      goingTo: '',
      groups: {}
    }
  }
  sendInputValues = () => {
    console.log(this.state.goingTo);
    console.log(this.state.LeavingFrom);
    this.setState({
      goingTo: '',
      LeavingFrom: ''
    })
    this.getGroups()
  }
  componentDidMount() {
  }
  getGroups = () => {
    fetch('http://127.0.0.1:3000/groups', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        going_to: this.state.goingTo,
        leaving_from: this.state.LeavingFrom,
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      this.setState({
        groups: res,
        groupsView: true

      })
      console.log('this is the response',res)
    })
    .catch((err) => {
       console.log('cant find match');
    });
  }
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>

        <View style={styles.inputContainer}>
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={LeavingFrom => this.setState({ LeavingFrom })}
            value={this.state.LeavingFrom}
            placeholder="Leaving From"
          />
          <TextInput
            underlineColorIos="transparent"
            style={styles.input}
            onChangeText={goingTo => this.setState({ goingTo })}
            value={this.state.goingTo}
            placeholder="Going To"
          />
          <TouchableOpacity onPress={this.sendInputValues} style={styles.buttonContainer}>
            <Text style={styles.buttonText}> Find a Ride</Text>
          </TouchableOpacity>
        </View>

        {this.state.groupsView ? <View>
          {this.state.groups.map((item, idx) =>
          <View style={styles.group}>
            <Text key={idx}>
              Group: {item.name}&nbsp;
              From: {item.leaving_from}&nbsp;
              To: {item.going_to}
            </Text>
          </View>
          )}
          </View>
        : null}

      </TouchableOpacity>
    )
  }
}
