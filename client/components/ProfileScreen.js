import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  AsyncStorage,
  Text,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'; // inject data where we need
import DrawerButton from './DrawerButton';
import TabBar from './TabBar';
import styles from '../css/style';
import UserProfile from './UserProfile';

const mapStateToProps = (state) => {
  return {
    state,
  }
}

class Profile extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'CarGo',
    headerLeft: <DrawerButton navigation={navigation} />,
    drawerLabel: 'Profile',
  });
  constructor(props) {
    super(props);
    this.state = {
      username: [],
    };
    //this.loadHomeScreen = this.loadHomeScreen.bind(this);
  }

  loadHomeScreen() {
    this.props.navigation.navigate('Drawer');
  }
  render() {
      // const uri = this.props.picture;
    return (
      <View style={styles.container}>
          <Text>Welcome Back </Text>
      </View>
    );
  }
}

// changes


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 50,
//     backgroundColor: '#1abc9c ',
//   },
//   input: {
//     height: 40,
//     marginBottom: 20,
//   },
// });

// export default Profile;
export default connect(mapStateToProps)(Profile);
