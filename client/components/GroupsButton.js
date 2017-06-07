import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
// const propTypes = {
//   navigation: PropTypes.object.isRequired,
// };

const GroupsButton = props => (
  <TouchableOpacity onPress={() => props.navigation.navigate('ViewGroups')}>
    <Text>Groups</Text>
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

GroupsButton.propTypes = {
  navigation: PropTypes.object,
};

export default GroupsButton;