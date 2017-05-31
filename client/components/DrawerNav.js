
import { DrawerNavigator } from 'react-navigation';

import JoinGroup from './JoinGroupScreen';
import Home from './HomeScreen';
import Profile from './profileScreen';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  JoinGroup: { screen: JoinGroup },
  Profile: { screen: Profile },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;

