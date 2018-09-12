// @flow

import * as ActionTypes from "./constants";
import type { CheckInsAction } from "./actions";
import { usersData, checkinCountries } from "./conversion";

export type UserDataType = {
  checkin_data: string,
  home_country: string,
  ip: string,
  is_active: string,
  name: string,
  rating: number,
  _id: string
}

export type UserDataClientType = {
  checkinData: string,
  homeCountry: string,
  checkinCountry: string,
  isActive: string,
  name: string,
  rating: number,
  id: string,
  isHighlighted?: boolean
}

export type UsersDataType = Array<UserDataType>;

export type UsersDataClientType = Array<UserDataClientType>;

export type CheckinCountryClientItemType = {
  id: number,
  name: string
};

export type MaxUsersRatingByCountriesItemType = {
  countryName: string,
  maxRating: number
};

export type CheckinCountriesClientType = {
  countries: Array<CheckinCountryClientItemType>,
  maxUsersRatingByCountries: Array<MaxUsersRatingByCountriesItemType>
};

export type CheckInsState = {
  tableData: UsersDataClientType,
  countries: Array<CheckinCountryClientItemType>,
  maxUsersRatingByCountries: Array<MaxUsersRatingByCountriesItemType>
};

export const initialState = {
  tableData:                 [],
  countries:                 [],
  maxUsersRatingByCountries: []
};

export default function reducer(state: CheckInsState = initialState, action: CheckInsAction): CheckInsState {
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
