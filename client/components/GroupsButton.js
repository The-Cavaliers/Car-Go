import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  paddingRight: 20,
};

const GroupsButton = props => (
  <TouchableOpacity style={styles} onPress={() => props.navigation.navigate('ViewGroups')}>
    <Text>Groups</Text>
  </TouchableOpacity>
 );

GroupsButton.propTypes = {
  navigation: PropTypes.object,
};

export default GroupsButton;
