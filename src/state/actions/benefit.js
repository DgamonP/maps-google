import { benefitConstants } from '../constants';
import { benefitService } from '../services';
import { s3Service } from '../services';
const bucket = 'benefits';
const load = (data) => ({ type: benefitConstants.LOAD, data });

const benefitsList = () => {
  return (dispatch) => {
    dispatch(request());
    benefitService.getAll().then(
      (benefits) => {
        dispatch(success(benefits.benefits));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: benefitConstants.LIST_REQUEST };
  }
  function success(benefits) {
    return { type: benefitConstants.LIST_SUCCESS, benefits };
  }
  function failure(error) {
    return { type: benefitConstants.LIST_FAILURE, error };
  }
};

const benefitDetails = (benefitId, benefits) => {
  return (dispatch) => {
    if (benefits.length !== 0) {
      const result = benefits.filter((benefitItem) => benefitItem._id === benefitId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      benefitService.getById(benefitId).then(
        (res) => {
          dispatch(success(res.benefit));
          dispatch(load(res.benefit));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: benefitConstants.GETBYID_REQUEST };
  }
  function success(benefit) {
    return { type: benefitConstants.GETBYID_SUCCESS, benefit };
  }
  function failure(error) {
    return { type: benefitConstants.GETBYID_FAILURE, error };
  }
};

const benefitRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    const copia = {
      ...data,
      phone: '591' + data.phone,
    };
    if (data.pathPhoto) {
      s3Service
        .uploadFile(data.pathPhoto, bucket)
        .then((fileInformation) => {
          const benefitData = { ...copia, path: fileInformation.location } || copia;
          benefitService.register(benefitData).then(
            (res) => {
              dispatch(success(res));
            },
            (error) => {
              dispatch(failure(error));
            }
          );
        })
        .catch((err) => {
          console.log('S3 Err', err);
        });
    } else {
      benefitService.register(copia).then(
        (res) => {
          dispatch(success(res));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: benefitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: benefitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: benefitConstants.REGISTER_FAILURE, error };
  }
};

const benefitUpdate = (benefitId, data) => {
  return (dispatch) => {
    dispatch(request());
    const copia = {
      ...data,
      phone: '591' + data.phone,
    };
    // delete copia._id;
    delete copia.account;
    if (data.pathPhoto) {
      s3Service
        .uploadFile(data.pathPhoto, bucket)
        .then((fileInformation) => {
          const benefit = { ...copia, path: fileInformation.location } || copia;
          benefitService.update(benefitId, benefit).then(
            (res) => {
              dispatch(success(res));
              dispatch(benefitsList());
            },
            (error) => {
              alert(error.errorMessage);
              dispatch(failure(error));
            }
          );
          // console.log('S3 Resp', copia);
        })
        .catch((err) => {
          // console.log('S3 Err', err);
        });
    } else {
      benefitService.update(benefitId, copia).then(
        (res) => {
          dispatch(success(res));
          dispatch(benefitsList());
        },
        (error) => {
          alert(error.errorMessage);
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: benefitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: benefitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: benefitConstants.REGISTER_FAILURE, error };
  }
};

const benefitActivateDeactivate = (benefitId, data) => {
  return (dispatch) => {
    dispatch(request());
    benefitService.activateDeactivate(benefitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(benefitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: benefitConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: benefitConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: benefitConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: benefitConstants.OFF_SUCCESS,
});

export const benefit = {
  load,
  benefitsList,
  benefitRegister,
  benefitDetails,
  benefitUpdate,
  benefitActivateDeactivate,
  offSuccess,
};
