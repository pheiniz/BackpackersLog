import createReducer from "./createReducer";
import * as types from "../actions/types";

const initialState = {
  markers: []
};

export const markerState = createReducer(initialState, {
  [types.ADD_MARKERS](state = initialState, action) {
    return Object.assign({}, ...state, {markers: action.payload});
  }
});
