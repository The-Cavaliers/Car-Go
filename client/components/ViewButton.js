import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// const propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

const ViewButton = props => (
  <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
    <Image source={require('../assets/menuu.jpg')} style={styles.icon} />
  </TouchableOpacity>
 );
// DrawerButton.propTypes = propTypes;
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    padding: 10,
  },
});

ViewButton.propTypes = {
  navigation: PropTypes.object,
};

export default ViewButton;