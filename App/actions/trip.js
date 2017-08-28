import * as types from "./types";
import Firebase from "../Config/Firebase.js";

export const uploadTrip = trip => dispatch => {
  dispatch({type: types.UPLOAD_TRIP_STARTED});

  Firebase
    .database()
    .ref("trips")
    .push(trip)
    .then((res) => {
      dispatch({type: types.UPLOAD_TRIP_SUCCESS, payload: marker});
    });
};

export const addTrip = trip => dispatch => {
  dispatch({type: types.ADD_TRIP, payload: trip});
}