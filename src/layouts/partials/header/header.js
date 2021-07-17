import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';

import { StyleContext } from '../../../theme/BaseStyles';
import { C_TYPOGRAPHY } from '../../../components';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { ListItemText, Menu, MenuItem } from '@material-ui/core';
import { notification } from '../../../state/actions';

const C_Header = (props) => {
  const classes = useContext(StyleContext);
  const { onClick, open, onResponsive, notifications, read } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickItem = (id) => {
    setAnchorEl(null);
    read(id, notifications);
  };

  const handleClose = () => {
    setAnchorEl(null);
    /* setAnchorEl(event.currentTarget); */
  };

  return (
    <AppBar position='absolute' className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        {!open && (
          <div className={classes.logo_secondary}>
            <img src='/assets/icons/favicon-32x32.png' alt='Logo' />
          </div>
        )}
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={onClick}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='open drawer'
          onClick={onResponsive}
          className={classes.d_responsive}
        >
          <MenuIcon />
        </IconButton>
        <C_TYPOGRAPHY
          noWrap={true}
          color={'white'}
          className={classes.title}
          style={{ position: 'relative', left: 5 }}
        >
          DeltaX
        </C_TYPOGRAPHY>
        <IconButton color='inherit' onClick={handleClick}>
          <Badge badgeContent={notifications.length} color='primary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
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
      </Toolbar>
    </AppBar>
  );
};

C_Header.propTypes = {
  open: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};

C_Header.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => {
  const { notifications } = state.notification;
  return { notifications };
};

const actionCreators = {
  read: notification.readNotification,
};

export default connect(mapStateToProps, actionCreators)(withTranslation()(C_Header));
