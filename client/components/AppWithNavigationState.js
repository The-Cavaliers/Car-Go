import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'; // inject data where we need
import * as actionCreators from '../reducers/actions/actionCreators'; // import everything
import routing from './routing';
import { AppNavigator } from './routing';
import Login from './LoginScreen';


// universal state
export function mapStateToProps(state) {
  return {
    group: state.group,
    profileDetails: state.profileDetails,
    nav: state.nav,
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(Login);
// connect everything with routing

export default AppWithNavigationState;
