import React, { Component} from 'react';

import {
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
	AsyncStorage,
	Text
} from 'react-native';
import JoinGroupOne from './JoinGroupOne.js';
import styles from '../css/style';

class FindRide extends Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		findRideView: true,
  		LeavingFrom: '',
  		goingTo: ''
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
    	console.log('this is the response',res)
    })
    .catch((err) => {
       console.log('cant find match');
    });
  }
  render() {
  	return (
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
  	)
  }
}

export default FindRide;