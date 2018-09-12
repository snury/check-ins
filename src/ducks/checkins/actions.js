// @flow

import type { DispatchAPI } from "redux";
import callApi, { GET } from "utils/http";
import type { Action } from "ducks/index";
import * as ActionTypes from "./constants";

export type CheckInsAction = Action;

/* eslint-disable import/prefer-default-export */

export const loadUsersData = (): CheckInsAction =>
  (dispatch: DispatchAPI<*>) => dispatch(callApi({
    endpoint: "/api/users",
    method:   GET,
    types:    [
      ActionTypes.LOAD_USERS_DATA_REQUEST,
      ActionTypes.LOAD_USERS_DATA_SUCCESS,
      ActionTypes.LOAD_USERS_DATA_FAILURE
    ]
  }));
