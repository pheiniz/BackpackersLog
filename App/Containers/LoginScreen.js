import React, { Component } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { connect } from "react-redux";

import { AccessToken } from "react-native-fbsdk";
import Firebase from "../Config/Firebase.js";

import FBLoginButton from "../Components/FBLoginButton.js";

class LocationInputScreen extends Component {
  onLoginFinished() {
    const auth = Firebase.auth();
    const provider = Firebase.auth.FacebookAuthProvider;

    AccessToken.getCurrentAccessToken().then(accessTokenData => {
      alert(accessTokenData.accessToken.toString());
      const credential = provider.credential(accessTokenData.accessToken);
      auth.signInWithCredential(credential);
    });
  }

  onLogoutFinished() {
    alert("logout!");
  }

  render() {
    return (
      <View style={styles.container}>
        <FBLoginButton
          onLoginFinished={this.onLoginFinished}
          onLogoutFinished={this.onLogoutFinished}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    savedMarkers: state.savedMarkers
  };
}

export default connect(mapStateToProps)(LocationInputScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255,255,155,0.7)"
  }
});
