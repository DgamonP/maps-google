import { reset } from 'redux-form';
import { typeTransportUnitService } from '../services';
import { typeTransportUnitConstants } from '../constants';

const load = (data) => ({ type: typeTransportUnitConstants.LOAD, data });

const typeTransportUnitsList = () => {
  return (dispatch) => {
    dispatch(request());
    typeTransportUnitService.getAll().then(
      (res) => {
        dispatch(success(res.typeTransportUnits));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeTransportUnitConstants.LIST_REQUEST };
  }
  function success(typeTransportUnits) {
    return { type: typeTransportUnitConstants.LIST_SUCCESS, typeTransportUnits };
  }
  function failure(error) {
    return { type: typeTransportUnitConstants.LIST_FAILURE, error };
  }
};

const typeTransportUnitDetails = (typeTransportUnitId, typeTransportUnits) => {
  return (dispatch) => {
    if (typeTransportUnits.length !== 0) {
      const result = typeTransportUnits.filter(
        (typeTransportUnit) => typeTransportUnit._id === typeTransportUnitId
      );
      dispatch(success(result[0]));
    } else {
      dispatch(request());
      typeTransportUnitService.getById(typeTransportUnitId).then(
        (res) => {
          dispatch(success(res.typeTransportUnit));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: typeTransportUnitConstants.GETBYID_REQUEST };
  }
  function success(typeTransportUnit) {
    return { type: typeTransportUnitConstants.GETBYID_SUCCESS, typeTransportUnit };
  }
  function failure(error) {
    return { type: typeTransportUnitConstants.GETBYID_FAILURE, error };
  }
};
const dataForBody = (data) =>
  data.features.map((item) => {
    if (item.value && item.value._id !== -1) {
      item.featuresTransportUnitId = item._id;
      item.valueId = item.value._id;
      if (item.Quantitative) {
        item.valueQuantitative = item.value.name;
      } else {
        item.valueQualitative = item.value.name;
      }
      delete item.Qualitative;
      delete item.Quantitative;
      delete item.account;
      delete item.path;
      delete item.requireForCarrier;
      delete item.value;
      delete item.values;
      delete item._id;
      return item;
    }
    return undefined;
  });

const typeTransportUnitRegister = (data) => {
  return (dispatch) => {
    dispatch(request());
    data.features = dataForBody(data);
    data.features = data.features.filter((item) => item !== undefined);
    typeTransportUnitService.register(data).then(
      (res) => {
        dispatch(success(res));
        dispatch(reset('FormGeneric'));
        // dispatch(typeTransportUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeTransportUnitConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: typeTransportUnitConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: typeTransportUnitConstants.REGISTER_FAILURE, error };
  }
};

const typeTransportUnitUpdate = (typeTransportUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    data.features = dataForBody(data);
    data.features = data.features.filter((item) => item !== undefined);
    delete data.currentFeatures;
    typeTransportUnitService.update(typeTransportUnitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(typeTransportUnitDetails(typeTransportUnitId, []));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeTransportUnitConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: typeTransportUnitConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: typeTransportUnitConstants.UPDATE_FAILURE, error };
  }
};

const typeTransportUnitActivateDeactivate = (typeTransportUnitId, data) => {
  return (dispatch) => {
    dispatch(request());
    typeTransportUnitService.activateDeactivate(typeTransportUnitId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(typeTransportUnitsList());
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: typeTransportUnitConstants.ACTIVATE_DEACTIVATE_REQUEST };
  }
  function success(res) {
    return { type: typeTransportUnitConstants.ACTIVATE_DEACTIVATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: typeTransportUnitConstants.ACTIVATE_DEACTIVATE_FAILURE, error };
  }
};

const typeTransportUnitsLoadData = (typeTransportUnitId, typeTransportUnit) => {
  // console.log('typeTransportUnit', typeTransportUnit);
  /* search redux before server */
  return (dispatch) => {
    if (typeTransportUnit !== null) {
      let data = { ...typeTransportUnit };
      data.currentFeatures = data.features;
      delete data.features;
      delete data.account;
      delete data._id;
      dispatch(success(data));
    } else {
      dispatch(request());
      typeTransportUnitService.getById(typeTransportUnitId).then(
        (res) => {
          const { typeTransportUnit } = res;
          let data = typeTransportUnit;
          data.currentFeatures = data.features;
          delete data.features;
          delete data.account;
          delete data._id;
          dispatch(success(data));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: typeTransportUnitConstants.LOAD_REQUEST };
  }
  function success(data) {
    return { type: typeTransportUnitConstants.LOAD_SUCCESS, data };
  }
  function failure(error) {
    return { type: typeTransportUnitConstants.LOAD_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: typeTransportUnitConstants.OFF_SUCCESS,
});

export const typeTransportUnit = {
  load,
  offSuccess,
  typeTransportUnitsList,
  typeTransportUnitDetails,
  typeTransportUnitRegister,
  typeTransportUnitUpdate,
  typeTransportUnitActivateDeactivate,
  typeTransportUnitsLoadData,
};
