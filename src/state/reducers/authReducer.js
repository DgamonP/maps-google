import { authConstants } from '../constants';

const initialState = {
  loading: false,
  loggedIn: false,
  starting: true,
  waitSession: true,
  user: null,
  userId: null,
  userType: null,
  profile: null,
  roles: null,
  error: null,
  data: null,
  showDialog: false,
  cognitoUserSession: null,
  saveToken: false,
  company: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case authConstants.CURRENT_USER_REQUEST:
      return {
        ...state,
        starting: false,
        loading: true,
      };
    case authConstants.CURRENT_USER_FAILURE:
      return {
        ...state,
        loading: false,
        waitSession: false,
        error: action.error,
      };

    case authConstants.GET_SESSION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.GET_SESSION_FAILURE:
      return {
        ...state,
        loading: false,
        waitSession: false,
        error: action.error,
      };
    case authConstants.GET_SESSION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case authConstants.GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.GET_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        starting: false,
        // roles: null,
        // error: null,
        // data: null,
        // showDialog: false,
        // cognitoUserSession: null,
        // saveToken: false,
        // company: null,
        user: null,
        userId: null,
        userType: null,
        profile: null,
        error: action.error,
      };
    case authConstants.GET_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        waitSession: false,
        loggedIn: true,
        user: action.cognitoUserSession,
        userId: action.userId,
        userType: action.userType,
        profile: action.profile,
        roles: action.roles,
        company: action.company,
        error: null,
        cognitoUserSession: null,
      };

    case authConstants.CLEAN_ERROR:
      return {
        ...state,
        error: null,
      };
    case authConstants.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstants.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        data: action.data,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        starting: false,
        waitSession: false,
        user: null,
        error: null,
        showDialog: false,
      };
    case authConstants.SHOW_DIALOG:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        starting: false,
        showDialog: action.show,
        data: action.data,
        cognitoUserSession: action.cognitoUserSession,
      };
    default:
      return state;
  }
};
