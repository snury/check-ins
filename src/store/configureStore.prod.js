// @flow

import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import requestMiddleware from "middleware/request";
import history from "utils/history";
import rootReducer from "ducks/index";

import type { State as StoreState, Action } from "ducks";

const middleware = applyMiddleware(thunk, requestMiddleware, apiMiddleware, routerMiddleware(history));

export default (initialState: any): Store<StoreState, Action> => createStore(
  rootReducer,
  initialState,
  middleware
);
