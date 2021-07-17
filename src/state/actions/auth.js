import { notification } from '.';
import { authConstants } from '../constants';
import { authService } from '../services';
import config from '../services/config';

const load = (data) => ({ type: authConstants.LOAD, data });

const cleanError = () => ({ type: authConstants.CLEAN_ERROR });

const showChangePassword = (show, data, cognitoUserSession) => {
  return (dispatch) => {
    dispatch(success(show, data, cognitoUserSession));
  };
  function success(show, data) {
    return { type: authConstants.SHOW_DIALOG, show, data, cognitoUserSession };
  }
};

const currentUser = () => {
  return (dispatch) => {
    dispatch(request());
    authService.currentUser().then(
      (cognitoUser) => {
        dispatch(success());
        dispatch(getSession(cognitoUser));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function success() {
    return { type: authConstants.CURRENT_USER_SUCCESS };
  }
  function request() {
    return { type: authConstants.CURRENT_USER_REQUEST };
  }
  function failure(error) {
    return { type: authConstants.CURRENT_USER_FAILURE, error };
  }
};

const getSession = (cognitoUser) => {
  return (dispatch) => {
    dispatch(request());
    authService.getSession(cognitoUser).then(
      (cognitoUserSession) => {
        dispatch(success());
        dispatch(saveTokenSession(cognitoUserSession, null));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
  function success() {
    return { type: authConstants.GET_SESSION_SUCCESS };
  }
  function request() {
    return { type: authConstants.GET_SESSION_REQUEST };
  }
  function failure(error) {
    return { type: authConstants.GET_SESSION_FAILURE, error };
  }
};

const login = (email, password) => {
  return (dispatch) => {
    console.log('login');
    dispatch(request());
    authService.login(email, password).then(
      (data) => {
        console.log('login', data);
        if (data.newPasswordRequired) {
          dispatch(showChangePassword(true, { email }, data.cognitoUserSession));
        } else {
          dispatch(saveTokenSession(data.cognitoUserSession, null));
        }
      },
      (error) => {
        dispatch(failure(error, { email, password }));
      }
    );
  };

  function request() {
    return { type: authConstants.AUTH_REQUEST };
  }
  function failure(error, data) {
    return { type: authConstants.AUTH_FAILURE, error, data };
  }
};

/* save token session in the axios interceptor in service/config.js */
const saveTokenSession = (cognitoUserSession, companyId) => {
  // console.log('companyId Action', companyId);
  config.configInterceptor(cognitoUserSession.idToken.jwtToken, companyId);
  return (dispatch) => {
    if (companyId === null) dispatch(getData(cognitoUserSession));
  };
};

const getData = (cognitoUserSession) => {
  const { username } = cognitoUserSession.accessToken.payload;
  return (dispatch) => {
    dispatch(request());
    authService.getUserById(username).then(
      ({ user }) => {
        console.log(user);
        const { _id, type, profile, roles, company } = user || {};
        dispatch(success(cognitoUserSession, _id, type, profile, roles, company));
        dispatch(saveTokenSession(cognitoUserSession, profile.companyId));
        dispatch(notification.pushTokenNotification(username));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: authConstants.GET_DATA_REQUEST };
  }
  function success(cognitoUserSession, userId, userType, profile, roles, company) {
    return {
      type: authConstants.GET_DATA_SUCCESS,
      cognitoUserSession,
      userId,
      userType,
      profile,
      roles,
      company,
    };
  }
  function failure(error) {
    return { type: authConstants.GET_DATA_FAILURE, error };
  }
};

const register = (email, nameuser, password) => {
  return (dispatch) => {
    dispatch(request());
    authService.register(email, nameuser, password).then(
      () => {
        dispatch(login(email, password));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: authConstants.AUTH_REQUEST };
  }
  function failure(error) {
    return { type: authConstants.AUTH_FAILURE, error };
  }
};

const logout = () => {
  authService.logout();
  return { type: authConstants.LOGOUT };
};

const completeNewPassword = (email, newPassword, cognitoUserSession) => {
  return (dispatch) => {
    dispatch(request());
    authService.completeNewPassword(email, newPassword, cognitoUserSession).then(
      (cognitoUserSession) => {
        dispatch(saveTokenSession(cognitoUserSession, null));
      },
      (error) => {
        dispatch(failure(error, { email, newPassword }));
      }
    );
  };

  function request() {
    return { type: authConstants.AUTH_REQUEST };
  }
  function failure(error, data) {
    return { type: authConstants.AUTH_FAILURE, error, data };
  }
};

export const auth = {
  load,
  cleanError,
  login,
  register,
  logout,
  currentUser,
  showChangePassword,
  completeNewPassword,
};
