import { connect } from 'react-redux';
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

class CreateList extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Your Groups',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Your Groups',
  });
  constructor(props) {
    super(props)
    this.state = {
      groups: [],
      group_id: '',
      showLoading: false
    }
    this.handleChatClick = this.handleChatClick.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.changeToMap = this.changeToMap.bind(this);
  }
  componentDidMount() {
    this.getGroups(this.props.id)
  }

  handleChatClick(id) {
    console.log('click Id', id)
    AsyncStorage.setItem('roomId', JSON.stringify(id), () => {
      this.props.navigation.navigate('ChatterBox');
    });
  }

  removeGroup(id) {
    this.setState({
      group_id: id,
    })

    fetch('http://127.0.0.1:3000/removegroup', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        group_id: id,
        user_id: this.props.id
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      console.log('this is the response',res)
      this.setState({
        groups: res
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }

  getGroups = () => {
    this.setState({
      showLoading: true
    })
    fetch('http://127.0.0.1:3000/grouplist', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: this.props.id
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      console.log('this is the response',res)
      this.setState({
        groups: res,
        showLoading: false
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }
  changeToMap(groupDetails) {
    console.log(groupDetails);
    //Check if the user is Driver or Rider
    if( this.props.email !== groupDetails.email ) {
     // console.log("I am driver");
      AsyncStorage.setItem('MapGroup', JSON.stringify({ group: groupDetails.group_id , role: 'Driver' , leavingFrom: groupDetails.leaving_from, goingTo: groupDetails.going_to }));
    } else {
      //console.log("I am rider");
      AsyncStorage.setItem('MapGroup', JSON.stringify({ group: groupDetails.group_id , role: 'Rider' , leavingFrom: groupDetails.leaving_from, goingTo: groupDetails.going_to }));
    }
    //console.log("propsssss", this.props);
    this.props.navigation.navigate('CarpoolMap');

  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.showLoading ? <Image style={styles.loading} source={require('../assets/loading.gif')} />
        : null}
        {this.state.groups.length === 0 ?
          <Text style={styles.error}>You have no groups</Text>
        : null}
        {this.state.groups.map((item, idx) =>
          <View key={idx} style={styles.group}>
            <TouchableOpacity onPress={() => this.handleChatClick(item.id)} key={idx} style={styles.joinButton}>
              <Text style={styles.chatbuttonText}>chat</Text>
            </TouchableOpacity>
            <Image style={styles.icon} source={{uri: item.img_url}} />
            <Text style={styles.name} >Group: {item.name}</Text>
            <Text style={styles.from} >From: {item.leaving_from}</Text>
            <Text style={styles.to}>To: {item.going_to}</Text>
            <Text style={styles.date}>Date: {item.travelDate}</Text>
            <View style={styles.removeBtnHolder}>
              <TouchableOpacity onPress={() => this.removeGroup(item.id)} key={idx} style={styles.removeButton}>
                <Text style={styles.removebuttonText}>delete</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.mapBtnHolder}>
              <TouchableOpacity onPress={() => this.changeToMap()} key={idx} style={styles.mapButton}>
                <Text style={styles.mapbuttonText}>Map</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    )
  }
}
const mapStateToProps = ({ loginProfile }) => {
  const {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  };
};
export default connect(mapStateToProps)(CreateList);
