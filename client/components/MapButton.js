import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  paddingRight: 20,
};

const MapButton = props => (
  <TouchableOpacity style={styles} onPress={() => props.navigation.navigate('ViewGroups')}>
    <Text>Unsubscribe</Text>
  </TouchableOpacity>
 );

MapButton.propTypes = {
  navigation: PropTypes.object,
};

export default MapButton;