import React, { PropTypes } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
const propTypes = {
  navigation: PropTypes.object.isRequired,
};
const DrawerButton = navigation => (
  <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
    <Image source={require('../assets/menu.jpg')} style={styles.icon} />
  </TouchableOpacity >
 );

DrawerButton.propTypes = propTypes;
const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    padding: 10,
  },
});
export default DrawerButton;
