import { clientConstants } from '../constants';
import { clientService } from '../services';

const load = (data) => ({ type: clientConstants.LOAD, data });

const clientsList = () => {
  return (dispatch) => {
    dispatch(request());
    clientService.getAll().then(
      (clients) => {
        dispatch(success(clients.clients));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: clientConstants.LIST_REQUEST };
  }
  function success(clients) {
    return { type: clientConstants.LIST_SUCCESS, clients };
  }
  function failure(error) {
    return { type: clientConstants.LIST_FAILURE, error };
  }
};

const clientRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    clientService.register(data).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: clientConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: clientConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: clientConstants.REGISTER_FAILURE, error };
  }
};

export const client = {
  load,
  clientsList,
  clientRegister,
};
