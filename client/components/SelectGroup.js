
import React, { Component, PropTypes } from 'react';
import {
View,
Button,
AsyncStorage,
} from 'react-native';
//import { pubnubStop, unSubscribeAll, unSubscribe } from '../services/pubnubClient';

class SelectGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedDetails: [],
      mapVisible: false,
      setRole: '',
    };
    this.onPressGroup1 = this.onPressGroup1.bind(this);
    this.onPressGroup2 = this.onPressGroup2.bind(this);
    this.onPressRider = this.onPressRider.bind(this);
    this.onPressDriver = this.onPressDriver.bind(this);
  }
  onPressGroup1() {
    const that = this;
    AsyncStorage.setItem('MapGroup', JSON.stringify({ group: 'group_1', role: that.state.setRole }));
   // unSubscribe('group_1');
    this.props.navigation.navigate('CarpoolMap');
  }
  onPressGroup2() {
    const that = this;
    AsyncStorage.setItem('MapGroup', JSON.stringify({ group: 'group_2', role: that.state.setRole }));
   // unSubscribe('group_2');
    this.props.navigation.navigate('CarpoolMap');
  }
  onPressRider() {
    this.setState({
      setRole: 'Rider',
    });
  //  unSubscribeAll();
  }
  onPressDriver() {
    this.setState({
      setRole: 'Driver',
    });
  //  unSubscribeAll();
  }

  render() {
    return (
      <View>
        <Button
          onPress={this.onPressGroup1}
          title="Group1"
          color="#841584"
        />
        <Button
          onPress={this.onPressGroup2}
          title="Group2"
          color="#841590"
        />
        <Button
          onPress={this.onPressRider}
          title="Join as Rider"
          color="#841590"
        />
        <Button
          onPress={this.onPressDriver}
          title="Join as Driver"
          color="#841590"
        />
      </View>
    );
  }

}

export default SelectGroup;

