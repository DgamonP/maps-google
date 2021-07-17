import { placeConstants } from '../constants';
import { placeService } from '../services';

const load = (data) => ({ type: placeConstants.LOAD, data });

const placesList = () => {
  return (dispatch) => {
    dispatch(request());
    placeService.getAll().then(
      (res) => {
        dispatch(success(res.places));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: placeConstants.LIST_REQUEST };
  }
  function success(places) {
    return { type: placeConstants.LIST_SUCCESS, places };
  }
  function failure(error) {
    return { type: placeConstants.LIST_FAILURE, error };
  }
};

const placeDetails = (placeId, places) => {
  return (dispatch) => {
    if (places.length !== 0) {
      const result = places.filter((place) => place._id === placeId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      placeService.getById(placeId).then(
        (res) => {
          dispatch(success(res.place));
          dispatch(load(res.place));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: placeConstants.GETBYID_REQUEST };
  }
  function success(place) {
    return { type: placeConstants.GETBYID_SUCCESS, place };
  }
  function failure(error) {
    return { type: placeConstants.GETBYID_FAILURE, error };
  }
};

const placeRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    placeService.register(data).then(
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
    return { type: placeConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: placeConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: placeConstants.REGISTER_FAILURE, error };
  }
};

const placeUpdate = (placeId, data) => {
  return (dispatch) => {
    dispatch(request());
    delete data.account;
    placeService.update(placeId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(placesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: placeConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: placeConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: placeConstants.REGISTER_FAILURE, error };
  }
};

const placeActivateDeactivate = (placeId, data) => {
  return (dispatch) => {
    dispatch(request());
    placeService.activateDeactivate(placeId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(placesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: placeConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: placeConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: placeConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: placeConstants.OFF_SUCCESS,
});

export const place = {
  load,
  placesList,
  placeRegister,
  placeDetails,
  placeUpdate,
  placeActivateDeactivate,
  offSuccess,
};
