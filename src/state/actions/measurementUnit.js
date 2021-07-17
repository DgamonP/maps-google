import { measurementUnitConstants } from '../constants';
import { measurementUnitService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: measurementUnitConstants.LOAD, data });

const measurementUnitsList = () => {
  return (dispatch) => {
    dispatch(request());
    measurementUnitService.getAll().then(
      (res) => {
        dispatch(success(res.measurementUnits));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: measurementUnitConstants.LIST_REQUEST };
  }
  function success(measurementUnits) {
    return { type: measurementUnitConstants.LIST_SUCCESS, measurementUnits };
  }
  function failure(error) {
    return { type: measurementUnitConstants.LIST_FAILURE, error };
  }
};

const measurementUnitDetails = (measurementUnitId, measurementUnits) => {
  return (dispatch) => {
    if (measurementUnits.length !== 0) {
      const result = measurementUnits.filter(
        (measurementUnit) => measurementUnit._id === measurementUnitId
      );
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      measurementUnitService.getById(measurementUnitId).then(
        (res) => {
          dispatch(success(res.measurementUnits));
          dispatch(load(res.measurementUnits));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: measurementUnitConstants.GETBYID_REQUEST };
  }
  function success(measurementUnit) {
    return { type: measurementUnitConstants.GETBYID_SUCCESS, measurementUnit };
  }
  function failure(error) {
    return { type: measurementUnitConstants.GETBYID_FAILURE, error };
  }
};

const measurementUnitRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    measurementUnitService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(measurementUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: measurementUnitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: measurementUnitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: measurementUnitConstants.REGISTER_FAILURE, error };
  }
};

const measurementUnitUpdate = (measurementUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    measurementUnitService.update(measurementUnitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(measurementUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: measurementUnitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: measurementUnitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: measurementUnitConstants.REGISTER_FAILURE, error };
  }
};

const measurementUnitActivateDesactivate = (measurementUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    measurementUnitService.activateDeactivate(measurementUnitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(measurementUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: measurementUnitConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: measurementUnitConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: measurementUnitConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: measurementUnitConstants.OFF_SUCCESS,
});

export const measurementUnit = {
  load,
  offSuccess,
  measurementUnitsList,
  measurementUnitDetails,
  measurementUnitRegister,
  measurementUnitUpdate,
  measurementUnitActivateDesactivate,
};
