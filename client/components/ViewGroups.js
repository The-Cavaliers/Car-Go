import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import TabView from 'react-native-scrollable-tab-view';
import ViewButton from './ViewButton';
import GroupList from './GroupList';

class ViewGroups extends Component {
	static navigationOptions = ({navigation}) => ({
    title: 'View Group',
    headerLeft: <ViewButton navigation={navigation} />,
    drawerLabel: 'View Group',
  });

	render() {
		return (
     <TabView tabBarPosition={'bottom'} initialPage={1}>

        <Text tabLabel='Groups Map'>Mahima Put Map Here</Text>

        <GroupList tabLabel='View Groups'/>

        <Text tabLabel='Chats'>Phong Put Chats here</Text>

      </TabView>
		)
	}
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default ViewGroups;
