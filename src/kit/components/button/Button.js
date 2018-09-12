import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

const OutlinedButtons = ({ title, classes, onClick }) => (
  <div>
    <Button onClick={onClick} variant="outlined" color="primary" className={classes.button}>
      {title}
    </Button>
  </div>
);

export default withStyles(styles)(OutlinedButtons);
