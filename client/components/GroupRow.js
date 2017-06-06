import React from 'react';
import {
  AsyncStorage,
  Button,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import SocketIOClient from 'socket.io-client';
import CONFIG from '../../config/development.json';

class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.socket = SocketIOClient(CONFIG.URL);
    // this.socket.on('userJoined', this.giveGroupId);
    this.giveGroupId = this.giveGroupId.bind(this);
  }

  giveGroupId() {
    const roomId = this.props.roomId;
    AsyncStorage.setItem('roomId', JSON.stringify(roomId))
    .then(() => {
      this.props.navigation.navigate('ChatterBox');
    })
  }

  render() {
    return(
      <Button
        title="button"
        onPress={this.giveGroupId}
      />
    )
  }
}

export default GroupRow;
