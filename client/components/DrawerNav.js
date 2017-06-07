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
  Profile: { screen: Profile },
  ChatterBox: { screen: ChatterBox },
  ViewGroups: { screen: ViewGroups },
  FindRide: { screen: JoinGroup },
  CreateGroup: { screen: CreateGroup },
  UserProfile: { screen: UserProfile },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);

export default Drawer
