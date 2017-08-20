import createReducer from "./createReducer";
import * as types from "../actions/types";

const initialState = {
  markerId: "invalidID",
  name: "",
  text: "",
  lat: 0,
  lng: 0 //irgendwas falsch hier
};

export const markerState = createReducer(
  {},
  {
    [types.ADD_MARKER](state = initialState, action) {
      return Object.assign({}, state, action.payload);
    }
  }
);
