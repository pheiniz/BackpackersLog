import createReducer from "./createReducer";
import * as types from "../actions/types";

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  token: "",
  user: {},
  errorMessage: ""
};
