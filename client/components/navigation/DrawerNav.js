import { DrawerNavigator } from 'react-navigation';
import React from 'react';
import Home from '../HomeScreen';
import UserProfile from '../UserProfile';
import Messenger from '../Messenger';
import GroupList from '../GroupList';
import JoinGroup from '../JoinGroupScreen';
import CreateGroup from '../CreateGroup';
// import PubNub from './clientPubNub';
import SelectGroup from '../SelectGroup';
import CarpoolMap from '../CarpoolMap';
import DrawerContent from '../DrawerContents';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  UserProfile: { screen: UserProfile },
  Messenger: { screen: Messenger },
  'Find Ride': { screen: JoinGroup },
  'Create Group': { screen: CreateGroup },
  GroupList: { screen: GroupList },
  SelectGroup: { screen: SelectGroup },
  CarpoolMap: { screen: CarpoolMap },
},
  // {
  //   drawerWidth: 200,
  //   drawerPosition: 'left',
  // },
  {
    contentComponent: props => <DrawerContent {...props} />,
    drawerWidth: 250,
    drawerPosition: 'left',
  },
);

export default Drawer;
