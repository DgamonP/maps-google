import { brandConstants } from '../constants';
import { brandService } from '../services';
import { reset } from 'redux-form';

const load = (data) => ({ type: brandConstants.LOAD, data });

const brandsList = () => {
  return (dispatch) => {
    dispatch(request());
    brandService.getAll().then(
      (res) => {
        dispatch(success(res.brand));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: brandConstants.LIST_REQUEST };
  }
  function success(brands) {
    return { type: brandConstants.LIST_SUCCESS, brands };
  }
  function failure(error) {
    return { type: brandConstants.LIST_FAILURE, error };
  }
};

const brandDetails = (brandId, brands) => {
  return (dispatch) => {
    if (brands.length !== 0) {
      const result = brands.filter((brand) => brand._id === brandId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      brandService.getById(brandId).then(
        (res) => {
          dispatch(success(res.brand));
          dispatch(load(res.brands));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: brandConstants.GETBYID_REQUEST };
  }
  function success(brand) {
    return { type: brandConstants.GETBYID_SUCCESS, brand };
  }
  function failure(error) {
    return { type: brandConstants.GETBYID_FAILURE, error };
  }
};

const brandRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    brandService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(brandsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: brandConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: brandConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: brandConstants.REGISTER_FAILURE, error };
  }
};

const brandUpdate = (brandId, data) => {
  return (dispatch) => {
    dispatch(request());
    brandService.update(brandId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(brandsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: brandConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: brandConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: brandConstants.UPDATE_FAILURE, error };
  }
};

const brandActivateDeactivate = (brandId, data) => {
  return (dispatch) => {
    dispatch(request());
    brandService.activateDeactivate(brandId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(brandsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: brandConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: brandConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: brandConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: brandConstants.OFF_SUCCESS,
});

export const brand = {
  load,
  offSuccess,
  brandsList,
  brandDetails,
  brandRegister,
  brandUpdate,
  brandActivateDeactivate,
};
