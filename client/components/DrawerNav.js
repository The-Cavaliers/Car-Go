
import { DrawerNavigator } from 'react-navigation';

import JoinGroup from './JoinGroupScreen';
import Home from './HomeScreen';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  JoinGroup: { screen: JoinGroup },

},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;

