import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Carpool from './CarpoolMap';

const styles = {
  paddingRight: 20,
};

const MapButton = props => {
  console.log(props);
  return (
  <TouchableOpacity style={styles} onPress={() => console.log("from MapButton")}>
    <Text>Unsubscribe</Text>
  </TouchableOpacity>
  );
};

MapButton.propTypes = {
  navigation: PropTypes.object,
};

export default MapButton;