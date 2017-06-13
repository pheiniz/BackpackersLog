import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import { AccessToken } from "react-native-fbsdk";

import FBLoginButton from "../Components/FBLoginButton.js";
import LocationInputScreen from "./LocationInputScreen.js";

class LoginScreen extends Component {
  onLoginFinished() {
    AccessToken.getCurrentAccessToken().then(accessTokenData => {
      //alert(accessTokenData.accessToken.toString());
      this.props.signInUser(accessTokenData);
    });
  }

  onLogoutFinished() {
    this.props.signOutUser();
  }

  render() {
    if (this.props.authState.user) {
      return <LocationInputScreen {...this.props} />;
    }
    return (
      <View style={styles.container}>
        <FBLoginButton
          onLoginFinished={() => {
            this.onLoginFinished();
          }}
          onLogoutFinished={() => {
            this.onLogoutFinished();
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    authState: state.authState
  };
}

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,155,0.7)"
  }
});
