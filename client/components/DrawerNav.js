
import { DrawerNavigator } from 'react-navigation';

import JoinGroup from './JoinGroupScreen';
import Home from './HomeScreen';
import CreateGroup from './CreateGroup';
import Profile from './ProfileScreen';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  'Find Ride': { screen: JoinGroup },
  'Create Group': { screen: CreateGroup },
  'Profile': { screen: Profile },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;

