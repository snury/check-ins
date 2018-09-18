import React from "react";
import { getClassName } from "kit/utils/components";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "kit/components/button/Button";
import { withRouter } from "react-router-dom";

import "./Home.scss";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop:    theme.spacing.unit * 10,
    paddingBottom: theme.spacing.unit * 10
  }
});

const cn = getClassName("home");

const PaperSheet = withRouter(({ history, classes }) => {
  return (
    <div className={cn()}>
      <Paper className={cx(`${classes.root}`, cn("main"))} elevation={1}>
        <Typography variant="headline" component="h3">
          Check-Ins App
        </Typography>
        <Button title="Get To Work" onClick={() => { history.push("/check-ins"); }} />
      </Paper>
    </div>
  );
});

export default withStyles(styles)(PaperSheet);
