// @flow

import type {
  UsersDataType,
  UsersDataClientType,
  CheckinCountriesClientType
} from "./reducer";

const removeDuplicates = (myArr, prop) => myArr.filter((obj, pos, arr) =>
  arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos);

const getMaxRating = data => data.reduce((max, user) => user.rating > max ? user.rating : max, data[0].rating);

export const usersData = {
  serverToLocal: (data: UsersDataType): UsersDataClientType => data.map((user) => {
    const {
      checkin_data: checkinData,
      home_country: homeCountry,
      ip: checkinCountry,
      is_active: isActive,
      name,
      rating,
      _id: id
    } = user;

    return {
      checkinData,
      homeCountry,
      checkinCountry,
      isActive,
      name,
      rating,
      id
    };
  })
};

export const checkinCountries = {
  serverToLocal: (data: UsersDataType): CheckinCountriesClientType => {
    const allUsersCountries = data.map(({ ip }) => ({ name: ip }));
    const uniqueCountries = removeDuplicates(allUsersCountries, "name");
    const countries = uniqueCountries.map(({ name }, id) => ({ id, name }));

    const maxUsersRatingByCountries = countries.map((country) => {
      const countryGroup = data.filter(({ ip }) => ip === country.name);

      return {
        countryName: country.name,
        maxRating:   getMaxRating(countryGroup)
      };
    });

    return {
      countries,
      maxUsersRatingByCountries
    };
  }
};
