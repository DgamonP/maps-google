import React from 'react';
import { TableCell, TableRow } from '@material-ui/core';
import { createStyles, withStyles, makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const StyleContext = React.createContext();

export const StyledTableCells = withStyles((theme) =>
  createStyles({
    head: {
      // backgroundColor: theme.palette.common.black,
      // color: theme.palette.common.white,
      fontFamily: 'Montserrat',
      fontWeight: 'bold',
      paddingRight: 4,
    },
    body: {
      fontSize: 12,
      borderRight: '1px solid #e8e8e8'
    },
  })
)(TableCell);

export const StyledTableRows = withStyles((theme) => ({
  root: {
    // '&:nth-of-type(odd)': {
    //   backgroundColor: theme.palette.action.hover,
    //   textAlign: 'center',
    // },
    textAlign: 'left',
  },
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    // backgroundColor: 'orange',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 12,
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

  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.45em',
      height: '0.45em',
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#EC8105',
      borderRadius: 5,
      // outline: '1px solid slategrey',
    }
  },

  root: {
    display: 'flex',
    // backgroundColor: "#e3f2fd",
    backgroundColor: '#FAFAFA',
    [theme.breakpoints.only('xs')]: {
      // backgroundColor: 'red',
    },
  },

  mainRoot: {
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    borderRadius: 2,
    paddingBottom: 30,
    background: '#FAFAFA',
  },

  mainRootHeader: {
    marginBottom: 0,
    padding: 6,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 2,
    background: '#FAFAFA',
  },

  d_flex: {
    display: 'flex',
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },

  d_menu: {
    display: 'block',
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },

  d_responsive: {
    display: 'none',
    [theme.breakpoints.only('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },

  paper_table: {
    borderRadius: 2,
    paddingRight: 15,
    paddingLeft: 15,
  },

  appBar: {
    background: '#EC8105 0% 0% no-repeat padding-box',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.only('sm')]: {
      width: '100%',
    },
    [theme.breakpoints.only('xs')]: {
      width: '100%',
    },
  },
  hide: {
    display: 'none',
  },

  menuButton: {
    marginRight: theme.spacing(1),
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  menuButtonHidden: {
    display: 'none',
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  logo_secondary: {
    width: 72,
    height: 64,
    background: 'orange',
    position: 'relative',
    left: -8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '1500ms',
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },

  title: {
    flexGrow: 1,
  },

  mainHome: {
    flexGrow: 1,
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    textColor: 'white',
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },

  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
    [theme.breakpoints.only('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'none',
    },
  },

  drawerPaperResponsive: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    display: 'none',
    [theme.breakpoints.only('sm')]: {
      display: 'block',
    },
    [theme.breakpoints.only('xs')]: {
      display: 'block',
    },
  },

  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  avatar: {
    backgroundColor: 'orange', //theme.palette.primary.main,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '99vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    border: '1px solid transparent !important',
  },
  paper: {
    // padding: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'flex',
    overflowY: 'hidden',
    overflowX: 'hidden',
    flexDirection: 'column',
    width: '100%',
    minWidth: '100%',
    backgroundColor: '#FAFAFA',
    // backgroundColor:'#e3f2fd',
    borderRadius: 2,
    border: '1px solid none !important',
  },

  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },

  logout: {
    paddingBottom: '50px',
    position: 'absolute',
    bottom: '0',
    right: '40%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  logoDelta: {
    width: '160px',
    height: 'auto',
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
}));
