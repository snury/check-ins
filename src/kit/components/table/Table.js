// @flow

import React, { Fragment } from "react";
import { omit } from "lodash";
import { getClassName } from "kit/utils/components";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import "./Table.scss";

const styles = theme => ({
  root: {
    width:     "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const cn = getClassName("table");

const CustomTable = ({ headingRow, rows, classes }) => (
  <Paper className={classes.root}>
    <Table className={cx(`${classes.table}`, cn())}>
      <TableHead>
        <TableRow>
          {headingRow.map(cell =>
            <TableCell key={cell} numeric={true}>{cell}</TableCell>)}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow className={cx(cn("row"), row.isHighlighted && cn("row--highlighted"))} key={row.id}>
            {Object.values(omit(row, ["id", "isHighlighted"])).map(cell =>
              <TableCell key={cell} numeric={typeof cell === "number"}><span>{cell}</span></TableCell>)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
);

export default withStyles(styles)(CustomTable);
