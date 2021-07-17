import { typeServiceConstants } from '../constants';
import { typeServiceService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: typeServiceConstants.LOAD, data });

const typeServicesList = () => {
  return (dispatch) => {
    dispatch(request());
    typeServiceService.getAll().then(
      (res) => {
        dispatch(success(res.typeServices));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeServiceConstants.LIST_REQUEST };
  }
  function success(typeServices) {
    return { type: typeServiceConstants.LIST_SUCCESS, typeServices };
  }
  function failure(error) {
    return { type: typeServiceConstants.LIST_FAILURE, error };
  }
};

const typeServiceDetails = (typeServiceId, typeServices) => {
  return (dispatch) => {
    if (typeServices.length !== 0) {
      const result = typeServices.filter((typeService) => typeService._id === typeServiceId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      typeServiceService.getById(typeServiceId).then(
        (res) => {
          dispatch(success(res.typeServices));
          dispatch(load(res.typeServices));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: typeServiceConstants.GETBYID_REQUEST };
  }
  function success(typeService) {
    return { type: typeServiceConstants.GETBYID_SUCCESS, typeService };
  }
  function failure(error) {
    return { type: typeServiceConstants.GETBYID_FAILURE, error };
  }
};

const typeServiceRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    typeServiceService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(typeServicesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeServiceConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: typeServiceConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: typeServiceConstants.REGISTER_FAILURE, error };
  }
};

const typeServiceUpdate = (typeServiceId, data) => {
  return (dispatch) => {
    dispatch(request());
    typeServiceService.update(typeServiceId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(typeServicesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeServiceConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: typeServiceConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: typeServiceConstants.UPDATE_FAILURE, error };
  }
};

const typeServiceActivateDeactivate = (typeServiceId, data) => {
  return (dispatch) => {
    dispatch(request());
    typeServiceService.activateDeactivate(typeServiceId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(typeServicesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeServiceConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: typeServiceConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: typeServiceConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: typeServiceConstants.OFF_SUCCESS,
});

export const typeService = {
  load,
  offSuccess,
  typeServicesList,
  typeServiceDetails,
  typeServiceRegister,
  typeServiceUpdate,
  typeServiceActivateDeactivate,
};
