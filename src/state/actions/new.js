import { newConstants } from '../constants';
import { newService } from '../services';
import { s3Service } from '../services';
const bucket = 'news';
const load = (data) => ({ type: newConstants.LOAD, data });

const newsList = () => {
  return (dispatch) => {
    dispatch(request());
    newService.getAll().then(
      (news) => {
        dispatch(success(news.news));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: newConstants.LIST_REQUEST };
  }
  function success(news) {
    return { type: newConstants.LIST_SUCCESS, news };
  }
  function failure(error) {
    return { type: newConstants.LIST_FAILURE, error };
  }
};

const newDetails = (newId, news) => {
  return (dispatch) => {
    if (news.length !== 0) {
      const result = news.filter((newItem) => newItem._id === newId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      newService.getById(newId).then(
        (res) => {
          dispatch(success(res.new));
          dispatch(load(res.new));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: newConstants.GETBYID_REQUEST };
  }
  function success(newBody) {
    return { type: newConstants.GETBYID_SUCCESS, new: newBody };
  }
  function failure(error) {
    return { type: newConstants.GETBYID_FAILURE, error };
  }
};

const newRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    if (data.pathPhoto) {
      s3Service
        .uploadFile(data.pathPhoto, bucket)
        .then((fileInformation) => {
          const newData = { ...data, path: fileInformation.location } || data;
          newService.register(newData).then(
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
          // console.log('S3 Err', err);
        });
    } else {
      newService.register(data).then(
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
    return { type: newConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: newConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: newConstants.REGISTER_FAILURE, error };
  }
};

const newUpdate = (newId, data) => {
  return (dispatch) => {
    dispatch(request());
    delete data.account;
    if (data.pathPhoto) {
      s3Service
        .uploadFile(data.pathPhoto, bucket)
        .then((fileInformation) => {
          const newData = { ...data, path: fileInformation.location } || data;
          // console.log(newData);
          newService.update(newId, newData).then(
            (res) => {
              dispatch(success(res));
              dispatch(newsList());
            },
            (error) => {
              alert(error.errorMessage);
              dispatch(failure(error));
            }
          );
          // console.log('S3 Resp', data);
        })
        .catch((err) => {
          // console.log('S3 Err', err);
        });
    } else {
      // console.log(data);
      newService.update(newId, data).then(
        (res) => {
          dispatch(success(res));
          dispatch(newsList());
        },
        (error) => {
          alert(error.errorMessage);
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: newConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: newConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: newConstants.REGISTER_FAILURE, error };
  }
};

const newActivateDeactivate = (newId, data) => {
  return (dispatch) => {
    dispatch(request());
    newService.activateDeactivate(newId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(newsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: newConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: newConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: newConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: newConstants.OFF_SUCCESS,
});

export const newAccion = {
  load,
  newsList,
  newRegister,
  newDetails,
  newUpdate,
  newActivateDeactivate,
  offSuccess,
};
