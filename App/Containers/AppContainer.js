import React, { Component } from "react";
import LocationInputScreen from "./LocationInputScreen.js";
import LoginScreen from "./LoginScreen.js";
import { NavigatorIOS, StyleSheet } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

class AppContainer extends Component {
  render() {
    // return (
    //   <NavigatorIOS
    //     style={styles.navContainer}
    //     initialRoute={{
    //       component: LocationInputScreen,
    //       title: "LocationInputScreen",
    //       navigationBarHidden: true
    //     }}
    //   />
    // );
    // return <LocationInputScreen {...this.props} />;
    return <LoginScreen {...this.props} />;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(state => {
  return {};
}, mapDispatchToProps)(AppContainer);

var styles = StyleSheet.create({
  navContainer: {
    flex: 1
  }
});
