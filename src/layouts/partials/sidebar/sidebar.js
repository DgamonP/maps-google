import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { auth } from '../../../state/actions';

import clsx from 'clsx';
import { Drawer, SwipeableDrawer } from '@material-ui/core';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import C_Menu from './listmenu';
import { StyleContext } from '../../../theme/BaseStyles';

import Avatar from '@material-ui/core/Avatar';
import { C_BUTTON, C_TOOLTIP, C_TYPOGRAPHY } from '../../../components';

const Sidebar = (props) => {
  const classes = useContext(StyleContext);
  const { open, openResponsive, onResponsive, onClick, logout, profile, company } = props;
  const { name } = company || {};
  function onLogout() {
    logout();
  }
  function componentProfile() {
    return (
      <ListItem>
        <ListItemIcon>
          <Avatar className={classes.avatar}>
            <img src='/assets/img_profile.png' width='100%' height='100%' alt='Logo' />
          </Avatar>
        </ListItemIcon>
        <ListItemText style={{ display: 'block' }}>
          <div>
            <C_TYPOGRAPHY variant='h1' style={{ fontSize: 13 }} align='left'>
              {`${profile.firstName} ${profile.lastName}`}
            </C_TYPOGRAPHY>
          </div>
          <div>
            <C_TYPOGRAPHY
              variant='body2'
              style={{ fontSize: 10, position: 'relative', top: 2 }}
              color={!open ? 'white' : '#707070'}
              align='left'
            >
              {name}
            </C_TYPOGRAPHY>
          </div>
          <div>
            <C_TYPOGRAPHY
              variant='body2'
              style={{ fontSize: 9, cursor: 'pointer', position: 'relative', top: 5 }}
              color='#EC8105'
              align='left'
            >
              <C_BUTTON variant='text' fontSize={9} fullWidth={false} onClick={onLogout}>
                Cerrar sesión
              </C_BUTTON>
            </C_TYPOGRAPHY>
          </div>
        </ListItemText>
      </ListItem>
    );
  }

  function onComponent() {
    return (
      <>
        <div className={classes.toolbar}>
          <img src='/assets/logo-deltax.png' alt='Logo' className={classes.logoDelta} />
          <IconButton onClick={onClick} className={classes.d_menu}>
            <ChevronRightIcon />
          </IconButton>
          <IconButton onClick={onResponsive} className={classes.d_responsive}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <C_Menu onMenu={onResponsive} open={open} />
        </List>

        <List
          style={{
            position: 'relative',
            bottom: 5,
            width: '100%',
            left: 0,
            cursor: !open ? 'pointer' : 'default',
          }}
        >
          <C_TOOLTIP disableHoverListener={open} title={<>{componentProfile()}</>}>
            {componentProfile()}
          </C_TOOLTIP>
        </List>
      </>
    );
  }

  return (
    <>
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        {onComponent()}
      </Drawer>
      <div className={classes.d_responsive}>
        <SwipeableDrawer
          open={openResponsive}
          classes={{
            paper: clsx(classes.drawerPaperResponsive),
          }}
          onClose={onResponsive}
          onOpen={onResponsive}
        >
          {onComponent()}
        </SwipeableDrawer>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,

  onClick: PropTypes.func.isRequired,
};

Sidebar.defaultProps = {
  open: false,
};

const mapStateToProps = (state) => {
  const { profile, company } = state.auth;
  return { profile, company };
};

const actionCreators = {
  logout: auth.logout,
};

const C_Sidebar = connect(mapStateToProps, actionCreators)(withTranslation()(Sidebar));

export { C_Sidebar };
