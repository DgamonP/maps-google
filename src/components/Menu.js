import React, { useContext } from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';


import List from '@material-ui/core/List';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@material-ui/core/Drawer';
import { withTranslation } from 'react-i18next';
import PersonIcon from '@material-ui/icons/Person';

import { auth } from '../state/actions';
import { StyleContext } from "../theme/BaseStyles";




const Menu = (props) => {

  const classes = useContext(StyleContext);
  
  const { t, logout, open, handleDrawerClose } = props;


  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer
    variant="permanent"
    className={clsx(classes.drawer, {
      [classes.drawerOpen]: open,
      [classes.drawerClose]: !open,
    })}
    classes={{
      paper: clsx({
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      }),
    }}
  >
    <div className={classes.toolbar}>
       <img src="/assets/logo-deltax.png" alt="Logo" className={classes.logoDelta}/>
      <IconButton onClick={handleDrawerClose}>
        <ChevronRightIcon />
      </IconButton>
    </div>
    <List>
        <ListItem button>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary={t('menu.home')} />
        </ListItem>
    </List>
    <List>
        <ListItem button >
          <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
          <ListItemText primary={t('menu.operations')} />
        </ListItem>
    </List>
    <List>
        <ListItem button >
          <ListItemIcon><FolderOpenIcon /></ListItemIcon>
          <ListItemText primary={t('menu.administration')} />
        </ListItem>
    </List>
    <List>
        <ListItem button >
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary={t('menu.settings')} />
        </ListItem>
    </List>
    <List>
        <ListItem button >
          <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
          <ListItemText primary={t('menu.access')} />
        </ListItem>
    </List>
    <List>
        <ListItem button >
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary={t('menu.reports')} />
        </ListItem>
    </List>
    <div className={classes.logout}>
        <PersonIcon />
        <Button
          type='submit'
          variant='outlined'
          size='small'
          color='primary'
          className={classes.margin}
          onClick={handleLogout}
        >
          Salir
        </Button>
      </div>
  </Drawer>
  );
};



const mapStateToProps = () => {
  return {};
};

const actionCreators = {
  logout: auth.logout,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(Menu));
