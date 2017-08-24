import createReducer from "./createReducer";
import * as types from "../actions/types";

const initialState = {
  error: "",
  loading: false,
  user: null
};

export const authState = createReducer(initialState, {
  [types.SIGN_IN_REQUEST](state = initialState, action) {
    return Object.assign({}, state, {loading: true});
  },
  [types.SIGN_IN_SUCCESS](state = initialState, action) {
    return Object.assign({}, state, {user: action.payload});
  },
  [types.SIGN_IN_FAILURE](state = initialState, action) {
    return Object.assign({}, state, {error: action.payload});
  },
  [types.SET_INITIAL_STATE](state = initialState, action) {
    return initialState;
  }
});
