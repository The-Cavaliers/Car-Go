import { DrawerNavigator } from 'react-navigation';

import Home from '../HomeScreen';
import UserProfile from '../UserProfile';
import ChatterBox from '../ChatterBox';
import GroupList from '../GroupList';
import JoinGroup from '../JoinGroupScreen';
import CreateGroup from '../CreateGroup';
import ViewGroups from '../ViewGroups';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  UserProfile: { screen: UserProfile },
  ChatterBox: { screen: ChatterBox },
  'Find Ride': { screen: JoinGroup },
  'Create Group': { screen: CreateGroup },
  GroupList: { screen: GroupList },
  ViewGroups: { screen: ViewGroups },
  // CreateList: { screen: CreateList },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;
