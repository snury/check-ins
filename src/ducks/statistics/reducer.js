import * as ActionTypes from "./constants";
import { Monitoring } from "./conversion";

export const initialState = {
  monitoringsData: []
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.LOAD_MONITORINGS_DATA_SUCCESS:
      return {
        ...state,
        monitoringsData: Monitoring.serverToLocal(payload)
      };

    case ActionTypes.ACTIVATE_MONITORING_SUCCESS:
      return {
        ...state
      };

    case ActionTypes.DEACTIVATE_MONITORING_SUCCESS:
      return {
        ...state
      };


    default:
      return state;
  }
}
