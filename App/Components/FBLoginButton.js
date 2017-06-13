import React, { Component, PropTypes } from "react";

import { LoginButton, AccessToken } from "react-native-fbsdk";
import Firebase from "../Config/Firebase.js";
//
// const auth = Firebase.auth();
// const provider = Firebase.auth.FacebookAuthProvider;

class FBLoginButton extends Component {
  static propTypes = {
    onLoginFinished: PropTypes.func,
    onLogoutFinished: PropTypes.func
  };

  render() {
    return (
      <LoginButton
        publishPermissions={["publish_actions"]}
        onLoginFinished={(error, result) => {
          if (error) {
            alert("login has error: " + result.error);
          } else if (result.isCancelled) {
            alert("login is cancelled.");
          } else {
            this.props.onLoginFinished();
          }
        }}
        onLogoutFinished={() => this.props.onLogoutFinished()}
      />
    );
  }
}

export default FBLoginButton;
