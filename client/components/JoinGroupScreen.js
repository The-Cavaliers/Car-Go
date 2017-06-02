import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';

export default class JoinGroup extends Component {
   static navigationOptions= ({navigation}) => ({
    title: 'Find Ride',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Find Ride',
  });
  constructor(props) {
    super(props)
    this.state = {
      showSearchError: false,
      groupsView: false,
      LeavingFrom: '',
      goingTo: '',
      groups: {},
      date: new Date()
    }
  }
  sendInputValues = () => {
    this.setState({
      LeavingFrom: '',
      goingTo: '',
      date: new Date()
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
        travelDate: this.state.date,
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      this.setState({
        groups: res,
        groupsView: true,
        showSearchError: false

      })
      console.log('this is the response',res)
    })
    .catch((err) => {
      this.setState({
        showSearchError: true
      })
       console.log('cant find match', );
    });
  }
  render() {
    return (
      <View>

        <View style={styles.inputContainer}>
          {this.state.showSearchError ? <Text style={styles.error}>No groups found, try another date</Text> : null}
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
          <Text>Choose Date</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.date}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2017-06-01"
            maxDate="2021-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({date: date})}}
          />
          <TouchableOpacity onPress={this.sendInputValues} style={styles.buttonContainer}>
            <Text style={styles.buttonText}> Find a Ride</Text>
          </TouchableOpacity>
        </View>

        {this.state.groupsView ? <ScrollView>
          {this.state.groups.map((item, idx) =>
          <View key={idx} style={styles.group}>
            <Text>
              Group: {item.name}&nbsp;
              From: {item.leaving_from}&nbsp;
              To: {item.going_to}
            </Text>

            <TouchableOpacity key={idx} style={styles.joinButton}>
             <Text style={styles.joinbuttonText}>Join</Text>
            </TouchableOpacity>
          </View>
          )}
          </ScrollView>
        : null}

      </View>
    )
  }
}
