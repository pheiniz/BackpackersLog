import * as types from "./types";

import Firebase from "../Config/Firebase.js";

export const signInUser = accessTokenData => dispatch => {
  dispatch({ type: types.SIGN_IN_REQUEST });

  const provider = Firebase.auth.FacebookAuthProvider;
  const credential = provider.credential(accessTokenData.accessToken);

  Firebase.auth()
    .signInWithCredential(credential)
    .then(user => {
      dispatch({ type: types.SIGN_IN_SUCCESS, payload: user });
      alert(types.SIGN_IN_SUCCESS);
      // dispatch(reset("signin"));
      //
      // Actions.post();
    })
    .catch(error => {
      alert(types.SIGN_IN_FAILURE);
      dispatch({
        type: types.SIGN_IN_FAILURE,
        payload: error
      });
    });
};

export const clearState = () => ({ type: types.SET_INITIAL_STATE });

export const signOutUser = () => dispatch => {
  dispatch({ type: types.SET_INITIAL_STATE });

  Firebase.auth().signOut();
};
