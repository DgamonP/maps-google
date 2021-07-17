import { TableCell, TableRow } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    textAlign: 'left',
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      textAlign: 'center',
    },
  },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  textBold: {
    fontWeight: 'bold',
  },
  pending: {
    fontWeight: 'bold',
    color: 'red',
  },
  requiredValidation: {
    fontWeight: 'bold',
    color: 'yellow',
  },
  completed: {
    fontWeight: 'bold',
    color: 'green',
  },
  rowInfo: {
    marginBottom: '2em',
  },
  stateList: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  paper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
