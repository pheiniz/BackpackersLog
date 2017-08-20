import * as types from "./types";

export function fetchMarkers() {
  return (dispatch, getState) => {
    console.log(getState());
  };
}

// export function uploadMarker(marker)
export const uploadMarker = marker => dispatch => {
  dispatch({
    type: types.UPLOAD_MARKER_STARTED
  });

  // TODO Firebase logic
  // alert("upload");

  dispatch({
    type: types.UPLOAD_MARKER_SUCCESS,
    payload: marker
  });
};
