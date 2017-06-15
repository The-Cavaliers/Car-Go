import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import styles from '../css/style';
import DrawerButton from './DrawerButton';
import { Container, Content, Card, CardItem, Footer, FooterTab, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import { getChatIdAsync } from '../actions/index';

import CONFIG from '../../config/development.json';

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
      profile: [{}],
      modalVisible: false,
      showLoading: false,
    }
    this.props.styles = styles
    this.handleChatClick = this.handleChatClick.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
    this.changeToMap = this.changeToMap.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }
  componentDidMount() {
    this.getGroups(this.props.id)
    this.getProfile(this.props.email);
  }

  handleChatClick(id) {
    this.props.getChatIdAsync(id);
    this.props.navigation.navigate('Messenger');
  }

  removeGroup(group_id) {
    axios.post(`${CONFIG.URL}/removegroup`, {
      group_id,
      user_id: this.props.id,
      email: this.props.email,
    })
    .then((res) => {
      this.setState({
        groups: res.data,
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }

  getGroups = () => {
    this.setState({
      showLoading: true,
    })
    // fetch(`${CONFIG.URL}/grouplist`, {
    //   method: 'POST',
    //   headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     user_id: this.props.id
    //   }),
    // })
    // .then(res => (res.json()))
    axios.post(`${CONFIG.URL}/grouplist`, { user_id: this.props.id })
    .then((res) => {
      console.log('this is the res array from grouplist', res.data[0])
      this.setState({
        groups: res.data,
        // groups: res,
        showLoading: false
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }
  changeToMap() {

  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  renderProfile(email) {
    this.setModalVisible()
  }
  getProfile(email) {
    fetch(`${CONFIG.URL}/getuserprofile`, {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
    .then(res => (res.json()))
    .then((res) => {
      console.log('this is the response from profile',res)
      this.setState({
        profile: res,
      })
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }
  changeToMap(groupDetails) {
    console.log(groupDetails);
    if( this.props.email === groupDetails.email ) {
      AsyncStorage.setItem('MapGroup', JSON.stringify({
        group: groupDetails.group_id,
        role: 'Driver',
        leavingFrom: groupDetails.leaving_from, goingTo: groupDetails.going_to,
        driverEmail: groupDetails.email,
        userEmail: this.props.email,
      }));
    } else {
      AsyncStorage.setItem('MapGroup', JSON.stringify({
        group: groupDetails.group_id,
        role: 'Rider',
        leavingFrom: groupDetails.leaving_from, goingTo: groupDetails.going_to,
        driverEmail: groupDetails.email,
        userEmail: this.props.email,
      }));
    }
    this.props.navigation.navigate('CarpoolMap');

  }
  render() {
    return (
        <Container>
            <Content>

                  <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    <View style={styles.modals}>
                      <View style={styles.profileContainer}>
                        <Text style={{color: 'gray', paddingBottom: 8}}>{this.state.profile[0].first_name} {this.state.profile[0].last_name}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>{this.state.profile[0].gender}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Age: {this.state.profile[0].age}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Allow Smoking: {this.state.profile[0].smoking}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Allow Pets: {this.state.profile[0].pets}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Type of Music: {this.state.profile[0].music_preference}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Type of Car: {this.state.profile[0].preferred_ride}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Contact: {this.state.profile[0].email}</Text>
                        <Text style={{color: 'gray', paddingBottom: 8}}>Bio: {this.state.profile[0].about_me}</Text>
                      </View>
                      <Button block primary onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }}>
                        <Text>Close Profile</Text>
                      </Button>
                    </View>
                  </Modal>
              {this.state.groups.map((item, idx) =>
                <Card key={idx} >
                    <CardItem>
                        <Left>
                              <Thumbnail key={idx + 1} source={{uri: item.img_url}} />
                            <Body>
                                <Text >{item.name}</Text>
                                <Button transparent onPress={() => this.renderProfile(item.email)}>
                                  <Text note>Read Profile</Text>
                                </Button>
                            </Body>
                        </Left>
                        <Right>
                          <Text>Departing: {item.travelDate}</Text>
                        </Right>
                      </CardItem>
                      <CardItem>
                          <Body>
                          <Right>
                            <Text note>Leaving From: {item.leaving_from}</Text>
                          </Right>
                          <Left>
                            <Text note>Going to: {item.going_to}</Text>
                          </Left>
                          <Left>
                            <Text note>Available seats: {item.seats}</Text>
                          </Left>
                          </Body>
                      </CardItem>
                      <CardItem key={idx + 2}>
                          <Button small rounded primary onPress={() => this.changeToMap(item)}>
                              <Text>Map</Text>
                          </Button><Text>   </Text>
                          <Button small rounded danger onPress={() => this.removeGroup(item.id)}>
                              <Text >Remove</Text>
                          </Button><Text>   </Text>
                          <Button small rounded primary onPress={() => this.handleChatClick(item.id)}>
                              <Text>Message</Text>
                          </Button>
                    </CardItem>
               </Card>
              )}
            </Content>
        </Container>
    )
  }
}
const mapStateToProps = ({ loginProfile, messenger }) => {
  const {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  } = loginProfile;
  const { chatId } = messenger;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
    chatId,
  };
};

export default connect(mapStateToProps, { getChatIdAsync })(CreateList);
