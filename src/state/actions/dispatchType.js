import { dispatchTypeConstants } from '../constants';
import { dispatchTypeService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: dispatchTypeConstants.LOAD, data });

const dispatchTypesList = () => {
  return (dispatch) => {
    dispatch(request());
    dispatchTypeService.getAll().then(
      (res) => {
        dispatch(success(res.dispatchType));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: dispatchTypeConstants.LIST_REQUEST };
  }
  function success(dispatchTypes) {
    return { type: dispatchTypeConstants.LIST_SUCCESS, dispatchTypes };
  }
  function failure(error) {
    return { type: dispatchTypeConstants.LIST_FAILURE, error };
  }
};

const dispatchTypeDetails = (dispatchTypeId, dispatchTypes) => {
  return (dispatch) => {
    if (dispatchTypes.length !== 0) {
      const result = dispatchTypes.filter((dispatchType) => dispatchType._id === dispatchTypeId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      dispatchTypeService.getById(dispatchTypeId).then(
        (res) => {
          dispatch(success(res.DispatchType));
          // dispatch(load(res.DispatchType));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: dispatchTypeConstants.GETBYID_REQUEST };
  }
  function success(dispatchType) {
    return { type: dispatchTypeConstants.GETBYID_SUCCESS, dispatchType };
  }
  function failure(error) {
    return { type: dispatchTypeConstants.GETBYID_FAILURE, error };
  }
};

const dispatchTypeRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    dispatchTypeService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(dispatchTypesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: dispatchTypeConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: dispatchTypeConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: dispatchTypeConstants.REGISTER_FAILURE, error };
  }
};

const dispatchTypeUpdate = (dispatchTypeId, data) => {
  return (dispatch) => {
    dispatch(request());
    dispatchTypeService.update(dispatchTypeId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(dispatchTypesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: dispatchTypeConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: dispatchTypeConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: dispatchTypeConstants.REGISTER_FAILURE, error };
  }
};

const dispatchTypeActivateDeactivate = (dispatchTypeId, data) => {
  return (dispatch) => {
    dispatch(request());
    dispatchTypeService.activateDeactivate(dispatchTypeId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(dispatchTypesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: dispatchTypeConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: dispatchTypeConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: dispatchTypeConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: dispatchTypeConstants.OFF_SUCCESS,
});

export const dispatchType = {
  load,
  offSuccess,
  dispatchTypesList,
  dispatchTypeDetails,
  dispatchTypeRegister,
  dispatchTypeUpdate,
  dispatchTypeActivateDeactivate,
};
