import { operationStatusConstants } from '../constants';
import { operationStatusService } from '../services';

const operationStatesList = () => {
  return (dispatch) => {
    dispatch(request());
    operationStatusService.getAll().then(
      (res) => {
        dispatch(success(res.OperationStatus));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operationStatusConstants.LIST_REQUEST };
  }
  function success(operationStates) {
    return { type: operationStatusConstants.LIST_SUCCESS, operationStates };
  }
  function failure(error) {
    return { type: operationStatusConstants.LIST_FAILURE, error };
  }
};

const operationStatusRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    operationStatusService.register(data).then(
      (res) => {
        alert(res.message);
        dispatch(success(res));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operationStatusConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: operationStatusConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: operationStatusConstants.REGISTER_FAILURE, error };
  }
};

export const operationStatus = {
  operationStatesList,
  operationStatusRegister,
};
