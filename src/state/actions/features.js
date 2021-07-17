import { featureConstants } from '../constants';
import { featureService } from '../services';

const load = (data) => ({ type: featureConstants.LOAD, data });

const featuresList = () => {
  return (dispatch) => {
    dispatch(request());
    featureService.getAll().then(
      (features) => {
        dispatch(success(features.featuresTransportUnits));
      },
      (error) => {
        console.log('error ==>', error);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: featureConstants.LIST_REQUEST };
  }
  function success(features) {
    return { type: featureConstants.LIST_SUCCESS, features };
  }
  function failure(error) {
    return { type: featureConstants.LIST_FAILURE, error };
  }
};

const featureDetails = (featureId, features) => {
  return (dispatch) => {
    if (features.length !== 0) {
      const result = features.filter((feature) => feature._id === featureId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      featureService.getById(featureId).then(
        (res) => {
          dispatch(success(res.featuresTransportUnit));
          dispatch(load(res.featuresTransportUnit));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: featureConstants.GETBYID_REQUEST };
  }
  function success(feature) {
    return { type: featureConstants.GETBYID_SUCCESS, feature };
  }
  function failure(error) {
    return { type: featureConstants.GETBYID_FAILURE, error };
  }
};

const modifyData = (data) => ({
  ...data,
  Quantitative: data.typeFeature === 'Quantitative',
  Qualitative: data.typeFeature === 'Qualitative',
  values:
    data.typeFeature === 'Quantitative'
      ? data.values.map((item) => ({ valueQuantitative: parseInt(item.value) }))
      : data.values.map((item) => ({ valueQualitative: item.value })),
});

const featureRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    const copia = modifyData(data);
    delete copia.typeFeature;
    // console.log(copia);
    featureService.register(copia).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: featureConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: featureConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: featureConstants.REGISTER_FAILURE, error };
  }
};

const featureUpdate = (featureId, data) => {
  return (dispatch) => {
    dispatch(request());
    const copia = modifyData(data);
    delete copia.typeFeature;
    delete copia.account;
    // console.log(copia);
    featureService.update(featureId, copia).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(featuresList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: featureConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: featureConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: featureConstants.REGISTER_FAILURE, error };
  }
};

const featureActivateDesactivate = (featureId, data) => {
  return (dispatch) => {
    dispatch(request());
    featureService.activateDeactivate(featureId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(featuresList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: featureConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: featureConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: featureConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: featureConstants.OFF_SUCCESS,
});

export const feature = {
  load,
  featuresList,
  featureRegister,
  offSuccess,
  featureDetails,
  featureUpdate,
  featureActivateDesactivate,
};
