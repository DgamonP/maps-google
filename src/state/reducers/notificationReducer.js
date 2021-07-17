import { notificationConstants } from '../constants';

const initialState = {
  show: false,
  showButton: null,
  token: null,
  notifications: [],
  notification: {},
};

export const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationConstants.NOTIFICATION_SHOW:
      return {
        ...state,
        show: action.show,
        showButton: action.showButton,
      };
    case notificationConstants.ADD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case notificationConstants.ADD_SUCCESS:
      return {
        ...state,
        loading: false,
        notifications: [...state.notifications, action.notification],
      };
    case notificationConstants.ADD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case notificationConstants.READ_SUCCESS:
      return {
        ...state,
        notification: action.notification,
        notifications: action.notifications,
      };
    case notificationConstants.TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case notificationConstants.TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.token,
      };
    case notificationConstants.TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        token: null,
      };
    default:
      return state;
  }
};
