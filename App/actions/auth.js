import * as types from "./types";

export const signInUser = ({ accessTokenData }) => dispatch => {
  dispatch({ type: SIGN_IN_REQUEST });

  const provider = Firebase.auth.FacebookAuthProvider;
  const credential = provider.credential(accessTokenData.accessToken);

  firebase
    .auth()
    .signInWithCredential(credential)
    .then(user => {
      dispatch({ type: SIGN_IN_SUCCESS, payload: user });
      alert(SIGN_IN_SUCCESS);
      // dispatch(reset("signin"));
      //
      // Actions.post();
    })
    .catch(error => {
      alert(SIGN_IN_FAILURE);
      dispatch({ type: SIGN_IN_FAILURE, payload: authFailMessage(error.code) });
    });
};

export const clearState = () => ({ type: SET_INITIAL_STATE });

export const signOutUser = () => dispatch => {
  dispatch({ type: SET_INITIAL_STATE });

  firebase.auth().signOut();
};
