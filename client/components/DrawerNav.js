import { DrawerNavigator } from 'react-navigation';

import JoinGroup from './JoinGroupScreen';
import Home from './HomeScreen';
import CreateGroup from './CreateGroup';
import Profile from './ProfileScreen';
import ChatterBox from './ChatterBox/ChatterBox';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  'Find Ride': { screen: JoinGroup },
  'Create Group': { screen: CreateGroup },
  Profile: { screen: Profile },
  ChatterBox: { screen: ChatterBox },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;
