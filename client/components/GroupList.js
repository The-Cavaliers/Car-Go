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

import GET_CHAT_ID from '../actions/type';
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
      profile: [],
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
      showLoading: true
    })
    fetch(`${CONFIG.URL}/grouplist`, {
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
      this.setState({
        groups: res,
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
      console.log('THIS IS THE STATE', this.state.profile)
    })
    .catch((err) => {
       console.log('cant find match', err);
    });
  }
  render() {
    return (
        <Container>
            <Content>
                <View style={{marginTop: 22}}>
                  <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                   <View style={{marginTop: 22}}>
                    <View>
                      {this.state.profile.map((item, idx) => {
                          <Text>{item.first_name}</Text>
                      })}

                      <TouchableHighlight onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }}>
                        <Text>Close Profile</Text>
                      </TouchableHighlight>
                    </View>
                   </View>
                  </Modal>
                </View>
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
                          <Button small rounded primary onPress={() => this.changeToMap()}>
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
const mapStateToProps = ({ loginProfile, getChatId }) => {
  const {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
    id,
  } = loginProfile;
  const { chatId } = getChatId;
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
