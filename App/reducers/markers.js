import createReducer from "./createReducer";
import * as types from "../actions/types";

const initialState = {
  markers: []
};

export const savedMarkers = createReducer(
  {},
  {
    [types.ADD_MARKER](state = initialState, action) {
      return {
        ...state,
        markers: [...state.markers, action.payload]
      };
    }
  }
);
