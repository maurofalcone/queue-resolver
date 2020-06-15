import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TimeConverter from '../../helpers/time-converter';
import * as css from './table.module.css';
import moment from 'moment';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const formatTime = (value) => {
  if (!value || typeof value === "string") { return '-'; }
  const timestamp = TimeConverter.hoursToTimestamp(value);
  const tempTime = moment.duration(timestamp);
  const hh = parseInt(tempTime.hours(), 10) > 10 ? tempTime.hours() : `0${tempTime.hours()}`;
  const mm = parseInt(tempTime.minutes(), 10) > 10 ? tempTime.minutes() : `0${tempTime.minutes()}`;
  const ss = parseInt(tempTime.seconds(), 10) > 10 ? tempTime.seconds() : `0${tempTime.seconds()}`;
  var time = hh + ':' + mm + ':' + ss;
  return time;
}

const getPercentage = (value) => {
  if (!value || typeof value === "string") { return '-'; }
  return `${(value * 100).toFixed(2)}%`;
}

const displayQuantity = (value) => {
  if (!value || typeof value === "string") { return '-'; }
  return Math.round(value);
}

export default function SimpleTable({ rows }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={css.header}>Variables</TableCell>
            <TableCell className={css.header} align="center">Time (hh:mm:ss)</TableCell>
            <TableCell className={css.header} align="center">Percentage</TableCell>
            <TableCell className={css.header} align="center">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow className={css.row} key={row[0]}>
              <TableCell className={css.th} component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="center">{formatTime(row[1].hours)}</TableCell>
              <TableCell align="center">{getPercentage(row[1].percentage)}</TableCell>
              <TableCell align="center">{displayQuantity(row[1].quantity)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
