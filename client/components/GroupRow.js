import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Button,
} from 'react-native';



//FIX THIS
import { getRoomId } from '../reducers/GetRoomId';
import getRoomId from '../actions'

class GroupRow extends React.Component {
  constructor(props) {
    super(props);
    this.joinRoom = this.joinRoom.bind(this);
  }

  joinRoom() {
    const newRoomId = this.props.roomId;
    this.props.setRoomId(newRoomId);
    console.log(newRoomId);
    this.props.navigation.navigate('ChatterBox');
  }

  render() {
    return (
      <View>
        <Button
          title="button"
          onPress={this.joinRoom}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ roomId }) => {
  return {
    roomId,
  };
};

export default connect(mapStateToProps, {
  getRoomId,
})(GroupRow);
