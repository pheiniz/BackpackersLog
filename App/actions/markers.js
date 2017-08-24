import * as types from "./types";
import Firebase from "../Config/Firebase.js";

export function fetchMarkers() {
  return (dispatch, getState) => {
    console.log(getState());
  };
}

// export function uploadMarker(marker)
export const uploadMarker = marker => dispatch => {
  dispatch({type: types.UPLOAD_MARKER_STARTED});

  Firebase
    .database()
    .ref()
    .push(marker)
    .then((res) => {
      dispatch({type: types.UPLOAD_MARKER_SUCCESS, payload: marker});
    });
};

export const addMarkers = markers => dispatch => {
  dispatch({type: types.ADD_MARKERS, payload: markers});
}