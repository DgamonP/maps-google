import { cityConstants } from '../constants';
import { cityService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: cityConstants.LOAD, data });

const citiesList = () => {
  return (dispatch) => {
    dispatch(request());
    cityService.getAll().then(
      (res) => {
        dispatch(success(res.cities));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: cityConstants.LIST_REQUEST };
  }
  function success(cities) {
    return { type: cityConstants.LIST_SUCCESS, cities };
  }
  function failure(error) {
    return { type: cityConstants.LIST_FAILURE, error };
  }
};

const cityDetails = (cityId, cities) => {
  return (dispatch) => {
    if (cities.length !== 0) {
      const result = cities.filter((city) => city._id === cityId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      cityService.getById(cityId).then(
        (res) => {
          dispatch(success(res.city));
          dispatch(load(res.city));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: cityConstants.GETBYID_REQUEST };
  }
  function success(city) {
    return { type: cityConstants.GETBYID_SUCCESS, city };
  }
  function failure(error) {
    return { type: cityConstants.GETBYID_FAILURE, error };
  }
};

const cityRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    cityService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(citiesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: cityConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: cityConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: cityConstants.REGISTER_FAILURE, error };
  }
};

const cityUpdate = (cityId, data) => {
  return (dispatch) => {
    dispatch(request());
    cityService.update(cityId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(citiesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: cityConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: cityConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: cityConstants.UPDATE_FAILURE, error };
  }
};

const cityActivateDeactivate = (cityId, data) => {
  return (dispatch) => {
    dispatch(request());
    cityService.activateDeactivate(cityId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(citiesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: cityConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: cityConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: cityConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: cityConstants.OFF_SUCCESS,
});

export const city = {
  load,
  offSuccess,
  citiesList,
  cityDetails,
  cityRegister,
  cityUpdate,
  cityActivateDeactivate,
};
