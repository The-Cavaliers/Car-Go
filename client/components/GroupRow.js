import React from 'react';
import {
  AsyncStorage,
  Button,
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(CONFIG.URL);
    this.joinRoom = this.joinRoom.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
  }

  joinRoom() {
    const roomId = this.props.roomId;
    AsyncStorage.setItem('roomId', roomId);
    this.socket.emit('userJoined', roomId);
  }

  leaveRoom() {
    AsyncStorage.getItem('roomId', (err, roomId) => {
      console.log('leaving id front', roomId);
      this.socket.emit('userLeft', roomId);
    })
    .then(() => {
      this.joinRoom();
      this.props.navigation.navigate('ChatterBox');
    });
  }

  render() {
    return (
      <Button
        title="button"
        onPress={this.leaveRoom}
      />
    );
  }
}

export default GroupRow;
