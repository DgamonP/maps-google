import { TableCell } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { Montserrat } from '../../theme/fontFamily';

export const StyledTableCells = withStyles((theme) =>
  createStyles({
    head: {
      // backgroundColor: theme.palette.common.black,
      color: theme.palette.common.black,
      fontSize: 12,
      fontFamily: Montserrat.ExtraBold,
      padding: 3,
      paddingLeft: 8,
      paddingRight: 4,
      background: 'white',
      borderRight: '1px solid #e8e8e8',
    },
    body: {
      fontSize: 10,
      // fontFamily: Montserrat.Medium
    },
  })
)(TableCell);
