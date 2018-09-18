import callApi, { GET } from "utils/http";
import * as ActionTypes from "./constants";

/* eslint-disable import/prefer-default-export */

export const loadUsersData = () =>
  dispatch => dispatch(callApi({
    endpoint: "/api/users",
    method:   GET,
    types:    [
      ActionTypes.LOAD_USERS_DATA_REQUEST,
      ActionTypes.LOAD_USERS_DATA_SUCCESS,
      ActionTypes.LOAD_USERS_DATA_FAILURE
    ]
  }));
