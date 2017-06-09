import { TabNavigator } from 'react-navigation';

import CreateGroup from './CreateGroup';

const RouteConfigs = {
  TabTwo: { screen: CreateGroup },
};

const NavConfigs = {
  tabBarOptions: {
    // tint color is passed to text and icons (if enabled) on the tab bar
    activeTintColor: 'white',
    inactiveTintColor: 'blue',
    // background color is for the tab component
    activeBackgroundColor: 'blue',
    inactiveBackgroundColor: 'white',
  },
};

const TabBar = TabNavigator(RouteConfigs, NavConfigs);

export default TabBar;
