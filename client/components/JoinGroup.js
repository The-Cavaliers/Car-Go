
import { StackNavigator } from 'react-navigation';
import JoinGroupTwo from './JoinGroupTwo';

const routeConfiguration = {
  JoinGroupTwo: { screen: JoinGroupTwo },
};
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
};
const JoinGroup = StackNavigator(routeConfiguration, stackNavigatorConfiguration);
export default JoinGroup;
