import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import DrawerButton from './DrawerButton';

import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

import { getChatId } from '../reducers/index';

class Messenger extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Messenger',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Messenger',
  });
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: '',
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
    console.log('This is propppps', this.props)
    const user = {
      roomId: this.props.chatId,
      username: this.props.username,
      email: this.props.email,
    }
    this.socket.on('connect', (err, resp) => {
      user.socket_id = this.socket.id;
    })
    this.socket.emit('user-joined', user)
  }

  onSend(messages = []) {
    const newMessage = messages[0];
    this.socket.emit('message', messages[0], this.props.chatId);
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
    this.socket.emit('user-left', this.props.chatId, this.props.username)
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
      />
    );
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
export default connect(mapStateToProps)(Messenger);
