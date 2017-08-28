import * as types from "./types";
import Firebase from "../Config/Firebase.js";

export const uploadMarker = marker => (dispatch, getState) => {
  dispatch({type: types.UPLOAD_MARKER_STARTED});

  let activeTripKey = getState().tripState.activeTrip.key

  Firebase
    .database()
    .ref("trips/" + activeTripKey + "/markers")
    .push(marker)
    .then((res) => {
      dispatch({type: types.UPLOAD_MARKER_SUCCESS, payload: marker});
    });
};

export const addMarkers = markers => dispatch => {
  dispatch({type: types.ADD_MARKERS, payload: markers});
}