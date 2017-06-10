import { DrawerNavigator } from 'react-navigation';

import Home from '../HomeScreen';
import UserProfile from '../UserProfile';
import ChatterBox from '../ChatterBox';
import JoinGroup from '../JoinGroupScreen';
import CreateGroup from '../CreateGroup';
import ViewGroups from '../ViewGroups';
// import CreateList from '../GroupList';

const Drawer = DrawerNavigator({
  Home: { screen: Home },
  UserProfile: { screen: UserProfile },
  ChatterBox: { screen: ChatterBox },
  JoinGroup: { screen: JoinGroup },
  CreateGroup: { screen: CreateGroup },
  ViewGroups: { screen: ViewGroups },
  // CreateList: { screen: CreateList },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer;
