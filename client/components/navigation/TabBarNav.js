import React from 'react';
// Navigation
import { addNavigationHelpers } from 'react-navigation';
// Redux
import { connect } from 'react-redux';
import TabBar from './TabBar';

const mapStateToProps = state => ({
  navigationState: state.tabBar,
});

TabBarNavigation() {
  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <TabBar
        navigation={
          addNavigationHelpers({
            dispatch,
            state: navigationState,
          })
        }
      />
    );
  }
}
export default connect(mapStateToProps)(TabBarNavigation);