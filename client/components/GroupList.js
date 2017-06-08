import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from 'react-native';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';

export default class CreateGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      user_id: '',
      email: '',
      picture_url: '',
      groups: []
    }
    this.handleChatClick = this.handleChatClick.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
  }
  componentDidMount() {
    AsyncStorage.getItem('AsyncProfile', (err, user_data) => {
      var user = JSON.parse(user_data)
      this.getGroups(user.id)
      this.setState({
        username: user.username,
        user_id: user.id,
        email: user.email,
        picture_url: user.picture_url,
      })
    })
  }

  handleChatClick() {

  }
  removeGroup() {
    //console.log(this.state.user_id);
    fetch('http://127.0.0.1:3000/removegroup', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.state.user_id
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      //console.log('this is the response',res)
      this.setState({
        groups: res
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }

  getGroups = (id) => {
    fetch('http://127.0.0.1:3000/grouplist', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: id
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      //console.log('this is the response',res)
      this.setState({
        groups: res
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }
  render() {
    return (
      <View>
        {this.state.groups.map((item, idx) =>
          <View key={idx} style={styles.group}>
            <Image style={styles.icon} source={require('../assets/person.png')} />
            <Text>
              Group: {item.name}&nbsp;
              From: {item.leaving_from}&nbsp;
              To: {item.going_to}
            </Text>

            <View>
              <TouchableOpacity onPress={() => this.removeGroup()} key={idx} style={styles.removeButton}>
                <Text style={styles.removebuttonText}>dlt</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => this.handleChatClick()} key={idx} style={styles.joinButton}>
                <Text style={styles.joinbuttonText}>Msg</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }
}
