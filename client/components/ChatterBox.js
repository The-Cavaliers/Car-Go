import React from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';
import { loginProfile } from '../reducers/index';
import DrawerButton from './DrawerButton';

const avatar = require('../assets/carpool.png');

class ChatterBox extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Chatter Box',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'ChatterBox',
  });
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: '',
      picture_url: '',
      // userId: null,
      roomId: null,
    };
    this.onSend = this.onSend.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    // Keeps listening to the server side message emission;
    this.socket = SocketIOClient(CONFIG.URL);
    this.giveFirstMessage = this.giveFirstMessage.bind(this);
    this.getRoomId = this.getRoomId.bind(this);
    this.socket.on('receive', this.onReceivedMessage);
  }

  componentWillMount() {
    this.giveFirstMessage();
    this.getRoomId();
  }

  getRoomId() {
    AsyncStorage.getItem('roomId', (err, roomId) => {
      this.setState({ roomId });
      const message = {};
      message.roomId = roomId;
      this.socket.emit('userJoined', roomId);
    });
  }

  onSend(messages = []) {
    const newMessage = messages[0];
    newMessage.roomId = this.state.roomId;
    this.socket.emit('message', newMessage);
    this.storeMessages(messages);
  }

  onReceivedMessage(messages) {
    console.log('message receive on client', messages)
    this.storeMessages(messages);
  }

  storeMessages(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  giveFirstMessage() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hi ${this.props.username}!`, // input global state name here
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://static.vecteezy.com/system/resources/previews/000/147/625/original/carpool-vector.jpg',
          },
        },
      ],
      username: this.props.username,
      picture_url: this.props.picture_url,
    })
  }

  render() {
    const user = {
      _id: this.socket.id || -1,
      name: this.props.username,
      avatar: this.props.picture_url,
    };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
    );
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
  } = loginProfile;
  return {
    username,
    email,
    picture_url,
    token,
    social_provider,
    created_at,
  };
};


export default connect(mapStateToProps)(ChatterBox);
