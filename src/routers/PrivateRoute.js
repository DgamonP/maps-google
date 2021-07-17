import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ loggedIn, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => (loggedIn ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  // component: PropTypes.func.isRequired,
};
