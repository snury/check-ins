// @flow

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import checkins from "./checkins/reducer";

import type { CheckInsState } from "./checkins/reducer";

export type State = {
  routing: any,
  checkins: CheckInsState
}

export type Action = (dispatch: Dispatch<*>, getState: () => State) => any;

export default combineReducers({
  routing: routerReducer,
  checkins
});
