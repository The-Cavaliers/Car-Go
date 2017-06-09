import React, { Component, PropTypes } from 'react';
import {
View,
Button,
AsyncStorage,
} from 'react-native';

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
    this.props.navigation.navigate('CarpoolMap');
  }
  onPressGroup2() {
    const that = this;
    AsyncStorage.setItem('MapGroup', JSON.stringify({ group: 'group_2', role: that.state.setRole }));
    this.props.navigation.navigate('CarpoolMap');
  }
  onPressRider() {
    this.setState({
      setRole: 'Rider',
    });
    // AsyncStorage.setItem('Role', 'rider');
    // AsyncStorage.getItem('MapGroup', (err, group_data) => {
    //   this.setState({
    //     selecedDetails: (`${group_data}riderId`),
    //   });
    // });
  
  }
  onPressDriver() {
    // AsyncStorage.setItem('Role', 'driver');
    this.setState({
      setRole: 'Driver',
    });
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
