import { postulationConstants } from '../constants';
import { postulationService } from '../services';
// import { transportUnit } from './transportUnit';

const postulationsList = (travelId) => {
  return (dispatch) => {
    dispatch(request());
    postulationService.getAll(travelId).then(
      (res) => {
        dispatch(success(res.postulations));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: postulationConstants.LIST_REQUEST };
  }
  function success(postulations) {
    return { type: postulationConstants.LIST_SUCCESS, postulations };
  }
  function failure(error) {
    return { type: postulationConstants.LIST_FAILURE, error };
  }
};

const postulationAccept = (postulationId, travelId) => {
  return (dispatch) => {
    dispatch(request());
    postulationService.accept(postulationId).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(postulationsList(travelId));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: postulationConstants.ACCEPT_REQUEST };
  }
  function success(res) {
    return { type: postulationConstants.ACCEPT_SUCCESS, res };
  }
  function failure(error) {
    return { type: postulationConstants.ACCEPT_FAILURE, error };
  }
};

const postulationConfirmedDetails = (travelId) => {
  return (dispatch) => {
    dispatch(request());
    postulationService.getConfirmed(travelId).then(
      (res) => {
        dispatch(success(res.postulation));
        // if (res.postulation !== null) {
        //   dispatch(transportUnit.transportUnitDetails(res.postulation.transportUnitId));
        // }
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: postulationConstants.CONFIRMED_REQUEST };
  }
  function success(postulation) {
    return { type: postulationConstants.CONFIRMED_SUCCESS, postulation };
  }
  function failure(error) {
    return { type: postulationConstants.CONFIRMED_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: postulationConstants.OFF_SUCCESS,
});

export const postulation = {
  postulationsList,
  postulationAccept,
  postulationConfirmedDetails,
  offSuccess,
};
