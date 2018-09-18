import {
  loadMonitorings as loadMonitoringsAPI,
  activateMonitoring as activateMonitoringAPI,
  deactivateMonitoring as deactivateMonitoringAPI
} from "utils/webAPIUtils";
import * as ActionTypes from "./constants";


export function loadMonitoringData() {
  return async function(dispatch) {
    let response = null;

    try {
      response = await loadMonitoringsAPI();
    } catch (err) {
      return dispatch({
        type:    ActionTypes.LOAD_MONITORINGS_DATA_FAILURE,
        payload: err.response,
        error:   true
      });
    }

    return dispatch({
      type:    ActionTypes.LOAD_MONITORINGS_DATA_SUCCESS,
      payload: response
    });
  };
}

export function activateMonitoring(id) {
  return async function(dispatch) {
    let response = null;

    try {
      response = await activateMonitoringAPI(id);
    } catch (err) {
      return dispatch({
        type:    ActionTypes.ACTIVATE_MONITORING_FAILURE,
        payload: err.response,
        error:   true
      });
    }

    return dispatch({
      type:    ActionTypes.ACTIVATE_MONITORING_SUCCESS,
      payload: response
    });
  };
}

export function deactivateMonitoring(id) {
  return async function(dispatch) {
    let response = null;

    try {
      response = await deactivateMonitoringAPI(id);
    } catch (err) {
      return dispatch({
        type:    ActionTypes.DEACTIVATE_MONITORING_FAILURE,
        payload: err.response,
        error:   true
      });
    }

    return dispatch({
      type:    ActionTypes.DEACTIVATE_MONITORING_SUCCESS,
      payload: response
    });
  };
}
