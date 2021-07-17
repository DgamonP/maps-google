import React, { useState, useContext } from 'react';
import {
  AppBar,
  Badge,
  Button,
  FormControl,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Bowser from 'bowser';
import clsx from 'clsx';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { withTranslation } from 'react-i18next';
import { StyleContext } from '../theme/BaseStyles';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { notification } from '../state/actions';

const browser = Bowser.getParser(window.navigator.userAgent);
const browserName = browser.getBrowser().name;

const NavBar = (props) => {
  const classes = useContext(StyleContext);
  const { t, i18n, handleDrawerOpen, open, notifications, read } = props;

  const [language, setLanguage] = useState(localStorage.getItem('i18nextLng'));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleChange = (event) => {
    // console.log(browserName);
    let languaje = event.target.value;
    /* verifica el navegador */
    switch (browserName) {
      case 'Firefox':
        if (languaje === 'es') {
          i18n.changeLanguage('es-ES');
          setLanguage('es-ES');
        } else {
          i18n.changeLanguage(languaje);
          setLanguage(languaje);
        }
        break;
      default:
        i18n.changeLanguage(languaje);
        setLanguage(languaje);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickItem = (id) => {
    setAnchorEl(null);
    read(id, notifications);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          Delta X
        </Typography>
        <Button
          color='inherit'
          aria-controls='simple-menu'
          aria-haspopup='true'
          onClick={handleClick}
        >
          <Badge badgeContent={notifications.length} color='primary'>
            <NotificationsIcon />
          </Badge>
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {notifications.map((item) => (
            <MenuItem onClick={() => handleClickItem(item.data.id)} key={item.data.id}>
              <NotificationsIcon />
              <ListItemText primary={item.notification.title} secondary={item.notification.body} />
            </MenuItem>
          ))}
        </Menu>
        <FormControl className={classes.formControl}>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={language}
            onChange={handleChange}
          >
            <MenuItem value={'es'}>{t('navBar.spanish')}</MenuItem>
            <MenuItem value={'pt'}>{t('navBar.portuguese')}</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => {
  const { notifications } = state.notification;
  return { notifications };
};

const actionCreators = {
  read: notification.readNotification,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(NavBar));
