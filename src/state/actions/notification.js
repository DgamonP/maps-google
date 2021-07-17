import { notificationConstants } from '../constants';
import { notificationService } from '../services';
import { loadOrder, operation, postulation } from './index';

const showNotification = (show, showButton) => {
  return (dispatch) => {
    dispatch(success(show, showButton));
  };

  function success(show, showButton) {
    return { type: notificationConstants.NOTIFICATION_SHOW, show, showButton };
  }
};

const addNotification = (notification) => {
  return (dispatch) => {
    dispatch(success(notification));
  };

  function success(notification) {
    return { type: notificationConstants.ADD_SUCCESS, notification };
  }
};

const refreshNotification = (notification) => {
  return (dispatch) => {
    takeAction(dispatch, notification.data);
  };
};

const failureNotification = (error) => {
  return (dispatch) => {
    dispatch(failure(error));
  };

  function failure(error) {
    return { type: notificationConstants.ADD_FAILURE, error };
  }
};

const readNotification = (notificationId, notifications) => {
  const result = notifications.filter((notification) => notification.data.id === notificationId);
  const index = notifications.indexOf(result[0]);
  notifications.splice(index, 1);
  return (dispatch) => {
    dispatch(success(result[0], notifications));
    //dispatch actions
    takeAction(dispatch, result[0].data);
  };

  function success(notification, notifications) {
    return { type: notificationConstants.READ_SUCCESS, notification, notifications };
  }
};

const pushTokenNotification = (userId) => {
  return (dispatch) => {
    dispatch(request());
    notificationService.pushTokenNotification(userId).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: notificationConstants.TOKEN_REQUEST };
  }
  function success(res) {
    return { type: notificationConstants.TOKEN_SUCCESS, res };
  }
  function failure(error) {
    return { type: notificationConstants.TOKEN_FAILURE, error };
  }
};

const takeAction = (dispatch, data) => {
  switch (data.type) {
    case 'tasks':
      dispatch(loadOrder.loadOrderDetails(data.travelId, []));
      break;
    case 'postulation':
      dispatch(postulation.postulationsList(data.travelId));
      /* enviar a la pantalla del travel details */
      // history.push(`/loadOrder/show/${data.travelId}`);
      break;
    case 'postulationConfirmed':
      dispatch(postulation.postulationsList(data.travelId));
      dispatch(postulation.postulationConfirmedDetails(data.travelId));
      /* enviar a la pantalla del travel details */
      break;
    default:
      dispatch(operation.operationsList());
  }
};

export const notification = {
  showNotification,
  addNotification,
  readNotification,
  pushTokenNotification,
  failureNotification,
  refreshNotification,
};
