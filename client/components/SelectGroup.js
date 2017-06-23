
import React, { Component, PropTypes } from 'react';
import {
View,
AsyncStorage,
} from 'react-native';
import DrawerButton from './DrawerButton';
//import { pubnubStop, unSubscribeAll, unSubscribe } from '../services/pubnubClient';
import { Container, Content, Card, CardItem, Text, Body, Button, Right, Left, item } from 'native-base';

class SelectGroup extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Select Group',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Select Group Demo ',
  });

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
      // <View>
      //   <Button
      //     onPress={this.onPressGroup1}
      //     title="Group1"
      //     color="#841584"
      //   />
      //   <Button
      //     onPress={this.onPressGroup2}
      //     title="Group2"
      //     color="#841590"
      //   />
      //   <Button
      //     onPress={this.onPressRider}
      //     title="Join as Rider"
      //     color="#841590"
      //   />
      //   <Button
      //     onPress={this.onPressDriver}
      //     title="Join as Driver"
      //     color="#841590"
      //   />
      // </View>
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Demo</Text>
                </CardItem>
                  <CardItem>
                          <Body>
                          <Right>
                            <Text note>Leaving From:Cupertino Apple Office, SantaClara</Text>
                          </Right>
                          <Right>
                            <Text note>Going to: SomerSet Square Park, SantaClara</Text>
                          </Right>
                          </Body>
                      </CardItem>        
                      <Button block style={{marginBottom:10}}onPress={this.onPressGroup1}>
                        <Text>Group1</Text>
                      </Button> 
                     <Button block style={{marginBottom:10}}onPress={this.onPressGroup2}>
                        <Text>Group2</Text>
                    </Button>
                    <Button block style={{marginBottom:10}}onPress={this.onPressRider}>
                        <Text>Join As a Rider</Text>
                    </Button> 
                    <Button block style={{marginBottom:10}}onPress={this.onPressDriver}>
                        <Text>Join As a Driver</Text>
                    </Button>                      
                <CardItem header>
                  <Text></Text>
              </CardItem>
            </Card>
          </Content>
      </Container>
    );
  }

}

export default SelectGroup;

