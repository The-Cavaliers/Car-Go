// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as actionCreators from '../actions/actionCreator';
// import Main from './main';
//
// function mapStateToProps(state) {
//   return {
//     user: state.user,
//     group: state.group,
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreators, dispatch);
// }
// const App = connect(mapStateToProps, mapDispatchToProps)(Main);
//
// export default App;

///////////////

import React from 'react';
// Navigation
import { addNavigationHelpers } from 'react-navigation';
// Redux
import { connect } from 'react-redux';
import TabBar from './TabBar';

const mapStateToProps = state => ({
  navigationState: state.tabBar,
});

class TabBarNavigation extends React.Component {
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
