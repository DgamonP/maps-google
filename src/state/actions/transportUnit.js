import { transportUnitConstants } from '../constants';
import { transportUnitService } from '../services';

const transportUnitDetails = (transportUnitId) => {
  return (dispatch) => {
    dispatch(request());
    transportUnitService.getById(transportUnitId).then(
      (res) => {
        dispatch(success(res.transportUnit));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: transportUnitConstants.GETBYID_REQUEST };
  }
  function success(transportUnit) {
    return { type: transportUnitConstants.GETBYID_SUCCESS, transportUnit };
  }
  function failure(error) {
    return { type: transportUnitConstants.GETBYID_FAILURE, error };
  }
};

const transportUnitSearch = (name) => {
  return (dispatch) => {
    dispatch(request());
    transportUnitService.getSearch(name).then(
      (res) => {
        dispatch(success(res.users));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: transportUnitConstants.SEARCH_REQUEST };
  }
  function success(transportUnits) {
    return { type: transportUnitConstants.SEARCH_SUCCESS, transportUnits };
  }
  function failure(error) {
    return { type: transportUnitConstants.SEARCH_FAILURE, error };
  }
};

export const transportUnit = {
  transportUnitDetails,
  transportUnitSearch,
};
