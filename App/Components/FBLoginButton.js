import React, { Component } from "react";

import { LoginButton, AccessToken } from "react-native-fbsdk";
import Firebase from "../Config/Firebase.js";

const auth = Firebase.auth();
const provider = Firebase.auth.FacebookAuthProvider;

class FBLoginButton extends Component {
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
            AccessToken.getCurrentAccessToken().then(accessTokenData => {
              alert(accessTokenData.accessToken.toString());
              const credential = provider.credential(
                accessTokenData.accessToken
              );
              auth.signInWithCredential(credential);
            });
          }
        }}
        onLogoutFinished={() => alert("logout.")}
      />
    );
  }
}

export default FBLoginButton;
