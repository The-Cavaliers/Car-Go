import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const DrawerButton = props => (
  <TouchableOpacity onPress={() => props.navigation.navigate('DrawerOpen')}>
    <Image source={require('../assets/menuu.jpg')} style={styles.icon} />
  </TouchableOpacity>
 );

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    padding: 10,
  },
});

DrawerButton.propTypes = {
  navigation: PropTypes.object,
};

export default DrawerButton;
