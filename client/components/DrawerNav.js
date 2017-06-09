import { DrawerNavigator } from 'react-navigation';
import JoinGroup from './JoinGroupScreen';
import Home from './HomeScreen';
import Profile from './ProfileScreen';
import ChatterBox from './ChatterBox';
import ViewGroups from './ViewGroups';
import UserProfile from './UserProfile';
import Join from './Groups';
import PubNub from './clientPubNub';
// import PubNub from './clientPubNub';
import SelectGroup from './SelectGroup';
import CarpoolMap from './CarpoolMap';



const Drawer = DrawerNavigator({
  Home: { screen: Home },
  UserProfile: { screen: UserProfile },
  ChatterBox: { screen: ChatterBox },
  //'Find Ride': { screen: JoinGroup },
  //'Create Group': { screen: CreateGroup },
  Profile: { screen: Profile },
  // ViewGroups: { screen: ViewGroups },
  Join: { screen: Join },
  PubNub: {screen: PubNub },

  // PubNub: {screen: PubNub },
  SelectGroup: {screen: SelectGroup },
  CarpoolMap: {screen: CarpoolMap },
},
  {
    drawerWidth: 200,
    drawerPosition: 'left',
  },
);
export default Drawer;
