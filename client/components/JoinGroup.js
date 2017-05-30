
import { StackNavigator } from 'react-navigation';
import JoinGroupOne from './JoinGroupOne';
import JoinGroupTwo from './JoinGroupTwo';

const routeConfiguration = {
  JoinGroupOne: { screen: JoinGroupOne },
  JoinGroupTwo: { screen: JoinGroupTwo },
};
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'JoinGroupOne',
};
const JoinGroup = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
export default JoinGroup;
