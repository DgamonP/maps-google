
import { TableCell, TableRow } from '@material-ui/core';
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';

export const StyledTableCells = withStyles( ( theme ) =>
  createStyles( {
    head: {
      // backgroundColor: theme.palette.common.black,
      // color: theme.palette.common.white,
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      paddingRight: 4, 
    },
    body: {
      fontSize: 12,
    },
  } ),
) ( TableCell );

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    // backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
    borderRight: '1px solid #D9D9D9',
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    //   textAlign: 'center',
    // },
  },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
  paper_table_header: {
    borderRadius: 2,
    paddingRight: 15,
    paddingLeft: 15,
  },
  table: {
    minWidth: 700,
  },
  button: {
    margin: theme.spacing(1), //1*8
    textTransform: 'none',
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  textBold: {
    fontWeight: 'bold',
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
    padding: '6px 16px',
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main,
  },
  
}));
