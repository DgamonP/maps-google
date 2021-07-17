import { operatorService } from '../services';
import { operatorConstants } from '../constants';

const load = (data) => ({ type: operatorConstants.LOAD, data });

const operatorsList = (userId) => {
  return (dispatch) => {
    dispatch(request());
    operatorService.getAll(userId).then(
      (res) => {
        dispatch(success(res.users));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operatorConstants.LIST_REQUEST };
  }
  function success(operators) {
    return { type: operatorConstants.LIST_SUCCESS, operators };
  }
  function failure(error) {
    return { type: operatorConstants.LIST_FAILURE, error };
  }
};

const operatorDetails = (operatorId, operators) => {
  return (dispatch) => {
    if (operators.length !== 0) {
      const result = operators.filter((operator) => operator._id === operatorId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      operatorService.getById(operatorId).then(
        (res) => {
          dispatch(success(res.user));
          dispatch(load(res.user));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: operatorConstants.GETBYID_REQUEST };
  }
  function success(operator) {
    return { type: operatorConstants.GETBYID_SUCCESS, operator };
  }
  function failure(error) {
    return { type: operatorConstants.GETBYID_FAILURE, error };
  }
};

const operatorRegister = (data, companyId) => {
  return (dispatch) => {
    dispatch(request());
    const copia = {
      ...data,
      type: 'OPERATOR',
      profile: {
        ...data.profile,
        companyId,
        timeZone: 'America/La_Paz',
        documentId: data.profile.documentId + '_' + data.states,
      },
    };
    delete copia.states;
    operatorService.register(copia).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operatorConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: operatorConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: operatorConstants.REGISTER_FAILURE, error };
  }
};

const operatorUpdate = (operatorId, data, userId) => {
  return (dispatch) => {
    dispatch(request());
    const copia = {
      ...data,
      profile: {
        ...data.profile,
        documentId: data.profile.documentId + '_' + data.states,
      },
    };
    delete copia.states;
    delete copia.account;
    operatorService.update(operatorId, copia).then(
      (res) => {
        dispatch(success(res));
        dispatch(operatorsList(userId));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operatorConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: operatorConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: operatorConstants.REGISTER_FAILURE, error };
  }
};

const operatorActivateDeactivate = (operatorId, data, userId) => {
  return (dispatch) => {
    dispatch(request());
    operatorService.activateDeactivate(operatorId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(operatorsList(userId));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operatorConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: operatorConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: operatorConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: operatorConstants.OFF_SUCCESS,
});

export const operator = {
  load,
  operatorsList,
  operatorDetails,
  operatorRegister,
  operatorUpdate,
  operatorActivateDeactivate,
  offSuccess,
};
