import * as ActionTypes from "./constants";
import { usersData, checkinCountries } from "./conversion";

export const initialState = {
  tableData:                 [],
  countries:                 [],
  maxUsersRatingByCountries: []
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.LOAD_USERS_DATA_SUCCESS:
      return {
        ...state,
        tableData:                 usersData.serverToLocal(payload),
        countries:                 checkinCountries.serverToLocal(payload).countries,
        maxUsersRatingByCountries: checkinCountries.serverToLocal(payload).maxUsersRatingByCountries
      };

    default:
      return state;
  }
}
