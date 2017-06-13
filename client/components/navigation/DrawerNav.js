import { DrawerNavigator } from 'react-navigation';

import Home from '../HomeScreen';
import UserProfile from '../UserProfile';
import Messenger from '../Messenger';
import GroupList from '../GroupList';
import JoinGroup from '../JoinGroupScreen';
import CreateGroup from '../CreateGroup';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  UserProfile: { screen: UserProfile },
  Messenger: { screen: Messenger },
  'Find Ride': { screen: JoinGroup },
  'Create Group': { screen: CreateGroup },
  GroupList: { screen: GroupList },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;
