
import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ loggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (loggedIn ? <Redirect to='/' /> : <Component {...props} />)}
    />
  );
};

PublicRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  // component: PropTypes.func.isRequired,
};
