// @flow

import React, { Component } from "react";
import { connect } from "react-redux";
import { getClassName } from "kit/utils/components";
import { isEmpty } from "lodash";
import Container from "components/container/Container";
import Table from "kit/components/table/Table";
import Select from "kit/components/select/Select";
import { loadUsersData } from "ducks/checkins/actions";
import type {
  UsersDataClientType,
  CheckinCountryClientItemType,
  MaxUsersRatingByCountriesItemType
} from "ducks/checkins/reducer";
import "./CheckIns.scss";

type Props = {
  data: UsersDataClientType,
  countries: Array<CheckinCountryClientItemType>,
  maxUsersRatingByCountries: Array<MaxUsersRatingByCountriesItemType>,
  loadUsersData: Function
};

type State = {
  filteredData: ?UsersDataClientType,
  checkinCountrySelectValue: number,
  checkActivitySelectValue: number
};

const cn = getClassName("checkins");

const headingRow = [
  "CheckIn Data",
  "Home Country",
  "CheckIn Country",
  "Is Active",
  "Name",
  "Rating"
];

const activityOptions = [
  { id: 1, name: "Active" },
  { id: 2, name: "Not Active" }
];

export const styles = (theme: Object) => ({
  root: {
    display:        "table",
    fontFamily:     theme.typography.fontFamily,
    width:          "100%",
    borderCollapse: "collapse",
    borderSpacing:  0
  }
});

class CheckIns extends Component<Props, State> {
  state = {
    filteredData:              null,
    checkinCountrySelectValue: -1,
    checkActivitySelectValue:  -1
  };

  componentDidMount() {
    this.props.loadUsersData();
  }

  handleCheckinCountryChange = ({ target: { value } }) => {
    const { countries, data } = this.props;
    let filteredData = [];
    let country = { id: -1, name: "" };

    if (value !== -1) {
      country = countries.find(({ id }) => id === value) || {};
      filteredData = data.filter(({ checkinCountry }) => checkinCountry === country.name);
    }

    this.setState({
      checkinCountrySelectValue: country.id,
      filteredData,
      checkActivitySelectValue:  -1
    });
  };

  handleActivityChange = ({ target: { value } }) => {
    const { countries, data } = this.props;
    const { checkinCountrySelectValue } = this.state;
    const country = countries.find(({ id }) => id === checkinCountrySelectValue);
    const actualData = country ? data.filter(({ checkinCountry }) => checkinCountry === country.name) : data;
    const activity = value === 1 ? "Да" : "Нет";
    const filteredData = value !== -1 ? actualData.filter(({ isActive }) => isActive === activity) : actualData;

    this.setState({ checkActivitySelectValue: value, filteredData });
  };

  isShine = (users) => {
    const { maxUsersRatingByCountries } = this.props;
    return users && users.map((user) => {
      const { maxRating } = maxUsersRatingByCountries.find(({ countryName }) =>
        countryName === user.checkinCountry) || {};

      if (user.rating === maxRating) {
        user.isHighlighted = true;
      }

      return user;
    });
  };

  getOverallMaxRating = (users) => {
    const ratings = users.map(({ rating }) => rating);

    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  };

  getUserWithMaxRating = (data) => {
    let currentUser = { name: "" };
    if (!isEmpty(data)) {
      const maxRating = data.reduce((max, user) => user.rating > max ? user.rating : max, data[0].rating);
      currentUser = data.find(({ rating }) => rating === maxRating) || {};
    }

    return currentUser.name;
  };

  render() {
    const { data, countries } = this.props;
    const { filteredData, checkinCountrySelectValue, checkActivitySelectValue } = this.state;
    const currentDataSet = !filteredData ? data : filteredData;
    const overallMaxRating = this.getOverallMaxRating(currentDataSet);
    const userWithMaxRating = this.getUserWithMaxRating(currentDataSet);

    return (
      <Container className={cn()}>
        {countries &&
          <Select
            title="Countries"
            handleChange={this.handleCheckinCountryChange}
            value={checkinCountrySelectValue}
            options={countries}
          />
        }
        {activityOptions &&
          <Select
            title="Is Active"
            handleChange={this.handleActivityChange}
            value={checkActivitySelectValue}
            options={activityOptions}
          />
        }
        {!!overallMaxRating &&
          <h1 className={cn("heading")}>{`Overal Max Rating: ${overallMaxRating.toFixed(0)}`}</h1>
        }

        {!!userWithMaxRating &&
          <h1 className={cn("heading")}>{`Overal Max Rating: ${userWithMaxRating}`}</h1>
        }
        <Table
          rows={this.isShine(currentDataSet)}
          headingRow={headingRow}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ checkins: { tableData, countries, maxUsersRatingByCountries } }) => ({
  data: tableData,
  countries,
  maxUsersRatingByCountries
});

export default connect(mapStateToProps, { loadUsersData })(CheckIns);
