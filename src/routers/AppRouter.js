import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import App from '../layouts/app';

import firebase from '../helpers/firebase';
import HomeRoute from './HomeRoutes';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { auth, notification } from '../state/actions';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LoginClientScreen from '../screens/auth/LoginClientScreen';

import GoogleFontLoader from 'react-google-font-loader';
import { useStyles, StyleContext } from '../theme/BaseStyles';

/* route management */
const AppRouter = (props) => {
  const {
    loggedIn,
    loading,
    starting,
    addNotification,
    refreshNotification,
    notifications,
    waitSession,
    failure,
    theme,
  } = props;

  const classes = useStyles();

    if (starting) {
      props.currentUser();
    }

  /* revisar */
  useEffect(() => {
    if (firebase.messaging.isSupported()) {
      firebase.messaging().onMessage(

        (payload) => {
          console.log('primer plano');
          console.log(payload);
          addNotification(payload);
          refreshNotification(payload);
        },
        (err) => {
          console.log('error onMessage', err);
          failure(err);
        }
      );
    }
  }, [addNotification, failure]);

  if ((loading) || (waitSession)) {
    return (
      <Grid container justify='center' alignItems='center' style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <Router>
      <CssBaseline />
      <GoogleFontLoader
        fonts={[
          {
            font: 'Montserrat',
            weights: [600, '600i'],
          },
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
      <StyleContext.Provider value={classes}>
        <App loggedIn={loggedIn} theme={theme}>
          <Switch>
            <PublicRoute exact path='/login' component={LoginScreen} loggedIn={loggedIn} />
            <PublicRoute exact path='/client' component={LoginClientScreen} loggedIn={loggedIn} />
            <PublicRoute exact path='/register' component={RegisterScreen} loggedIn={loggedIn} />
            <PrivateRoute
              loggedIn={loggedIn}
              path={'/'}
              component={(props) => <HomeRoute {...props} />}
            />
          </Switch>
        </App>
      </StyleContext.Provider>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const { loggedIn, loading, starting, waitSession } = state.auth;
  const { notifications } = state.notification;
  return { loggedIn, loading, starting, notifications, waitSession };
};

const actionCreators = {
  currentUser: auth.currentUser,
  addNotification: notification.addNotification,
  refreshNotification: notification.refreshNotification,
  failure: notification.failureNotification,
};

export default connect(mapStateToProps, actionCreators)(AppRouter);
