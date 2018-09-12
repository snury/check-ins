// @flow

import "flexboxgrid";
import React from "react";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import history from "utils/history";
import configureStore from "store/configureStore";
import Home from "containers/home/Home";
import CheckIns from "containers/checkins/CheckIns";
import "./App.scss";

const store = configureStore();

export default () => (
  <Provider store={store}>
    <Router history={history}>
      <div className="app">
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/check-ins" component={CheckIns} />
        </Switch>
      </div>
    </Router>
  </Provider>
);
