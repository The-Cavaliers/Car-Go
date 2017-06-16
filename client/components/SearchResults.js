import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from '../css/style';

const SearchResults = ({ destination, getDestination, type }) => {
  return (
      <Button title={destination} onPress={() => { getDestination(destination, type); }}>
        <Text>{destination}</Text>
      </Button>
  );
};

export default SearchResults;
