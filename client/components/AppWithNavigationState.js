import { bindActionCreators } from 'redux';

// universal state
const mapStateToProp = (state) => {
  return {
    group: state.group,
    profileDetails: state.profileDetails,
    nav: state.nav,
  };
};

// export function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreators, dispatch);
// }

export default mapStateToProp;
