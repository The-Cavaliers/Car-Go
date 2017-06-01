import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// const propTypes = {
//   navigation: PropTypes.object.isRequired,
// };
const DrawerButton = navigation => (
  <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
    <Image source={require('../assets/car.jpg')} style={styles.icon} />
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

DrawerButton.propTypes = {
  navigation: PropTypes.object,
}

export default DrawerButton;
