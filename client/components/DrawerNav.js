import { DrawerNavigator } from 'react-navigation';

import JoinGroup from './JoinGroupScreen';
import Home from './HomeScreen';
import CreateGroup from './CreateGroup';
import Profile from './ProfileScreen';
import ChatterBox from './ChatterBox';
import ViewGroups from './ViewGroups';
import UserProfile from './UserProfile';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  UserProfile: { screen: UserProfile },
  ChatterBox: { screen: ChatterBox },
  'Find Ride': { screen: JoinGroup },
  'Create Group': { screen: CreateGroup },
  Profile: { screen: Profile },
  // ViewGroups: { screen: ViewGroups },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;
