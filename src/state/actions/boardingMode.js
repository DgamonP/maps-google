import { boardingModeConstants } from '../constants';
import { boardingModeService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: boardingModeConstants.LOAD, data });

const boardingModesList = () => {
  return (dispatch) => {
    dispatch(request());
    boardingModeService.getAll().then(
      (res) => {
        dispatch(success(res.boardingModes));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: boardingModeConstants.LIST_REQUEST };
  }
  function success(boardingModes) {
    return { type: boardingModeConstants.LIST_SUCCESS, boardingModes };
  }
  function failure(error) {
    return { type: boardingModeConstants.LIST_FAILURE, error };
  }
};

const boardingModeDetails = (boardingModeId, boardingModes) => {
  return (dispatch) => {
    if (boardingModes.length !== 0) {
      const result = boardingModes.filter((boardingMode) => boardingMode._id === boardingModeId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      boardingModeService.getById(boardingModeId).then(
        (res) => {
          dispatch(success(res.boardingMode));
          dispatch(load(res.boardingModes));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: boardingModeConstants.GETBYID_REQUEST };
  }
  function success(boardingMode) {
    return { type: boardingModeConstants.GETBYID_SUCCESS, boardingMode };
  }
  function failure(error) {
    return { type: boardingModeConstants.GETBYID_FAILURE, error };
  }
};

const boardingModeRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    boardingModeService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(boardingModesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: boardingModeConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: boardingModeConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: boardingModeConstants.REGISTER_FAILURE, error };
  }
};

const boardingModeUpdate = (boardingModeId, data) => {
  return (dispatch) => {
    dispatch(request());
    boardingModeService.update(boardingModeId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(boardingModesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: boardingModeConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: boardingModeConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: boardingModeConstants.UPDATE_FAILURE, error };
  }
};

const boardingModeActivateDeactivate = (boardingModeId, data) => {
  return (dispatch) => {
    dispatch(request());
    boardingModeService.activateDeactivate(boardingModeId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(boardingModesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: boardingModeConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: boardingModeConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: boardingModeConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: boardingModeConstants.OFF_SUCCESS,
});

export const boardingMode = {
  load,
  offSuccess,
  boardingModesList,
  boardingModeDetails,
  boardingModeRegister,
  boardingModeUpdate,
  boardingModeActivateDeactivate,
};
