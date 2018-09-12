// @flow

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display:  "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin:   theme.spacing.unit,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

const CustomSelect = ({
  title,
  handleChange,
  options,
  value,
  classes
}) => (
  <FormControl className={classes.formControl}>
    <InputLabel htmlFor="age-simple">{title}</InputLabel>
    <Select
      value={value}
      onChange={handleChange}
    >
      <MenuItem value={-1}>
        <em>None</em>
      </MenuItem>
      {options.map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
    </Select>
  </FormControl>
);

export default withStyles(styles)(CustomSelect);
