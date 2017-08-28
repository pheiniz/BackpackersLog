import * as types from "./types";
import Firebase from "../Config/Firebase.js";

export const uploadTrip = trip => (dispatch, getState) => {
  dispatch({type: types.UPLOAD_TRIP_STARTED});

  Firebase
    .database()
    .ref("trips")
    .push(trip)
    .then((res) => {
      dispatch({type: types.UPLOAD_TRIP_SUCCESS});
    });
};

export const changeActiveTrip = trip => dispatch => {
  dispatch({type: types.CHANGE_ACTIVE_TRIP, payload: trip});
}

export const addTrips = trips => dispatch => {
  dispatch({type: types.ADD_TRIPS, payload: trips});
}