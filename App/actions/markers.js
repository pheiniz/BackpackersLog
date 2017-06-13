import * as types from "./types";

// export function setSearchedRecipes({ recipes }) {
//   return {
//     type: types.SAVE_MARKER,
//     recipes
//   };
// }

export function fetchMarkers() {
  return (dispatch, getState) => {
    console.log(getState());
  };
}

export function addMarker(marker) {
  return {
    type: types.ADD_MARKER,
    payload: marker
  };
}
