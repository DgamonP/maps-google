import { basicTypeTransportUnitConstants } from '../constants';
import { basicTypeTransportUnitService, s3Service } from '../services';
const bucket = 'basicTransportUnit';

const load = (data) => ({ type: basicTypeTransportUnitConstants.LOAD, data });

const basicTypeTransportUnitsList = () => {
  return (dispatch) => {
    dispatch(request());
    basicTypeTransportUnitService.getAll().then(
      (res) => {
        dispatch(success(res.basicTransportUnit));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.LIST_REQUEST };
  }
  function success(basicTypeTransportUnits) {
    return { type: basicTypeTransportUnitConstants.LIST_SUCCESS, basicTypeTransportUnits };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.LIST_FAILURE, error };
  }
};

const basicTypeTransportUnitDetails = (basicTypeTransportUnitId, basicTypeTransportUnits) => {
  return (dispatch) => {
    if (basicTypeTransportUnits.length !== 0) {
      const result = basicTypeTransportUnits.filter(
        (basicTypeTransportUnit) => basicTypeTransportUnit._id === basicTypeTransportUnitId
      );
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      basicTypeTransportUnitService.getById(basicTypeTransportUnitId).then(
        (res) => {
          dispatch(success(res.basicTransportUnit));
          dispatch(load(res.basicTransportUnit));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.GETBYID_REQUEST };
  }
  function success(basicTypeTransportUnit) {
    return { type: basicTypeTransportUnitConstants.GETBYID_SUCCESS, basicTypeTransportUnit };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.GETBYID_FAILURE, error };
  }
};

/* const basicTypeTransportUnitRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    basicTypeTransportUnitService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        dispatch(basicTypeTransportUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: basicTypeTransportUnitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.REGISTER_FAILURE, error };
  }
}; */
const basicTypeTransportUnitRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    if (data.pathPhoto) {
      s3Service
        .uploadFile(data.pathPhoto, bucket)
        .then((fileInformation) => {
          const newData = { ...data, path: fileInformation.location } || data;
          basicTypeTransportUnitService.register(newData).then(
            (res) => {
              dispatch(success(res));
            },
            (error) => {
              dispatch(failure(error));
            }
          );
          // console.log('S3 Resp', data);
        })
        .catch((err) => {
          console.log('S3 Err', err);
          dispatch(failure(err));
        });
    }
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: basicTypeTransportUnitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.REGISTER_FAILURE, error };
  }
};

/* const basicTypeTransportUnitUpdate = (basicTypeTransportUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    basicTypeTransportUnitService.update(basicTypeTransportUnitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(basicTypeTransportUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: basicTypeTransportUnitConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.UPDATE_FAILURE, error };
  }
}; */
const basicTypeTransportUnitUpdate = (basicTypeTransportUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    // delete data._id;
    delete data.account;
    if (data.pathPhoto) {
      s3Service
        .uploadFile(data.pathPhoto, bucket)
        .then((fileInformation) => {
          const basicTypeTransportUnit = { ...data, path: fileInformation.location } || data;
          basicTypeTransportUnitService
            .update(basicTypeTransportUnitId, basicTypeTransportUnit)
            .then(
              (res) => {
                dispatch(success(res));
                dispatch(basicTypeTransportUnitsList());
              },
              (error) => {
                alert(error.errorMessage);
                dispatch(failure(error));
              }
            );
          // console.log('S3 Resp', data);
        })
        .catch((err) => {
          console.log('S3 Err', err);
          dispatch(failure(err));
        });
    } else {
      basicTypeTransportUnitService.update(basicTypeTransportUnitId, data).then(
        (res) => {
          dispatch(success(res));
          dispatch(basicTypeTransportUnitsList());
        },
        (error) => {
          alert(error.errorMessage);
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: basicTypeTransportUnitConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.UPDATE_FAILURE, error };
  }
};

const basicTypeTransportUnitActivateDeactivate = (basicTypeTransportUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    basicTypeTransportUnitService.activateDeactivate(basicTypeTransportUnitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(basicTypeTransportUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: basicTypeTransportUnitConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: basicTypeTransportUnitConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: basicTypeTransportUnitConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: basicTypeTransportUnitConstants.OFF_SUCCESS,
});

export const basicTypeTransportUnit = {
  load,
  offSuccess,
  basicTypeTransportUnitsList,
  basicTypeTransportUnitDetails,
  basicTypeTransportUnitRegister,
  basicTypeTransportUnitUpdate,
  basicTypeTransportUnitActivateDeactivate,
};
