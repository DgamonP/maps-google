import { companyConstants } from '../constants';
import { companyService } from '../services';

const load = (data) => ({ type: companyConstants.LOAD, data });

const companiesList = () => {
  return (dispatch) => {
    dispatch(request());
    companyService.getAll().then(
      (res) => {
        dispatch(success(res.companiesClient));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: companyConstants.LIST_REQUEST };
  }
  function success(companies) {
    return { type: companyConstants.LIST_SUCCESS, companies };
  }
  function failure(error) {
    return { type: companyConstants.LIST_FAILURE, error };
  }
};

const companyDetails = (companyId, companies) => {
  return (dispatch) => {
    if (companies.length !== 0) {
      const result = companies.filter((company) => company._id === companyId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      companyService.getById(companyId).then(
        (res) => {
          dispatch(success(res.companyClient));
          dispatch(load(res.companyClient));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: companyConstants.GETBYID_REQUEST };
  }
  function success(company) {
    return { type: companyConstants.GETBYID_SUCCESS, company };
  }
  function failure(error) {
    return { type: companyConstants.GETBYID_FAILURE, error };
  }
};

const companyRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    companyService.register(data).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: companyConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: companyConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: companyConstants.REGISTER_FAILURE, error };
  }
};

const companyUpdate = (companyId, data) => {
  return (dispatch) => {
    dispatch(request());
    // delete data._id;
    delete data.account;
    companyService.update(companyId, data).then(
      (res) => {
        dispatch(success(res));
        // dispatch(companiesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: companyConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: companyConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: companyConstants.REGISTER_FAILURE, error };
  }
};

const companyActivateDeactivate = (companyId, data) => {
  return (dispatch) => {
    dispatch(request());
    companyService.activateDeactivate(companyId, data).then(
      (res) => {
        dispatch(success(res));
        dispatch(companiesList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: companyConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: companyConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: companyConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: companyConstants.OFF_SUCCESS,
});

export const company = {
  load,
  companiesList,
  companyRegister,
  companyDetails,
  companyUpdate,
  companyActivateDeactivate,
  offSuccess,
};
