import React from 'react';
import { connect } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { loginProfile } from '../reducers/index';
import DrawerButton from './DrawerButton';

import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

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
      userId: '',
      roomId: 'default',
    };
    this.baseState = this.state;
    this.onSend = this.onSend.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.getRoomId = this.getRoomId.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.socket = SocketIOClient(CONFIG.URL);
    this.socket.on('receive', this.onReceivedMessage);
    this.getRoomId();
  }

  componentDidMount() {
    this.setState({ userId: this.socket.id });
  }

  getRoomId() {
    AsyncStorage.getItem('roomId', (err, roomId) => {
      const user = {
        roomId,
        username: this.props.username,
        email: this.props.email,
      }
      this.socket.on('connect', (err, resp) => {
        user.socket_id = this.socket.id;
      })
      console.log('user joined on ', user)
      this.socket.emit('userJoined', user)
      this.setState({ roomId });
    });
  }

  onSend(messages = []) {
    const newMessage = messages[0];
    newMessage.roomId = this.state.roomId;
    this.socket.emit('message', messages[0], this.state.roomId);
    this.storeMessages(messages);
  }

  onReceivedMessage(messages) {
    this.storeMessages(messages);
  }

  storeMessages(messages) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }


  renderBubble(props) {
    return (props.currentMessage.user._id === this.socket.id) ?
    (
      <Bubble
        {...props}
      />
    ) : (
      <View>
        <Text>{props.currentMessage.user.name}</Text>
        <Bubble
          {...props}
        />
      </View>
    )
  }

  componentWillUnmount() {
    this.setState(this.baseState);
    this.socket.emit('userLeft', this.state.roomId)
  }

  render() {
    const user = {
      _id: this.socket.id,
      name: this.props.username,
      avatar: this.props.picture_url,
    };
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
        renderBubble={this.renderBubble}
        renderAvatarOnTop={true}
        isLoadingEarlier={true}
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
