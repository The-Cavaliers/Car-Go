import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const GroupsButton = props => (
  <TouchableOpacity onPress={() => props.navigation.navigate('GroupList')}>
    <Text>Groups</Text>
  </TouchableOpacity>
 );

GroupsButton.propTypes = {
  navigation: PropTypes.object,
};

export default GroupsButton;
