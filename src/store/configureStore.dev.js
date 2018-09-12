// @flow

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";
import { apiMiddleware } from "redux-api-middleware";
import requestMiddleware from "middleware/request";
import history from "utils/history";
import rootReducer from "ducks/index";
import type { Store } from "redux";
import type { State as StoreState, Action } from "ducks";

const middleware = applyMiddleware(thunk, requestMiddleware, apiMiddleware, routerMiddleware(history));

const devTools = window.devToolsExtension ?
  window.devToolsExtension() : f => f;

export default (initialState: any): Store<StoreState, Action> => createStore(
  rootReducer,
  initialState,
  compose(middleware, devTools)
);
