import { operationConstants } from '../constants';
import { operationService } from '../services';
import { loadOrder } from './loadOrder';

const load = (data) => ({ type: operationConstants.LOAD, data });

const operationsList = () => {
  return (dispatch) => {
    // setTimeout(() => {
    dispatch(request());
    operationService.getAll().then(
      (res) => {
        res.operations = Array.isArray(res.operations) ? res.operations : [];
        dispatch(success(res.operations));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
    // }, 4000);
  };

  function request() {
    return { type: operationConstants.LIST_REQUEST };
  }
  function success(operations) {
    return { type: operationConstants.LIST_SUCCESS, operations };
  }
  function failure(error) {
    return { type: operationConstants.LIST_FAILURE, error };
  }
};

const operationDetails = (operationId, operations) => {
  return (dispatch) => {
    if (operations.length !== 0) {
      const result = operations.filter((operation) => operation._id === operationId);
      dispatch(success(result[0]));
      dispatch(load(result[0]));
    } else {
      dispatch(request());
      operationService.getById(operationId).then(
        ({ operation }) => {
          dispatch(load(operation));
          dispatch(success(operation));
        },
        (error) => {
          dispatch(failure(error));
        }
      );
    }
  };

  function request() {
    return { type: operationConstants.GETBYID_REQUEST };
  }
  function success(operation) {
    return { type: operationConstants.GETBYID_SUCCESS, operation };
  }
  function failure(error) {
    return { type: operationConstants.GETBYID_FAILURE, error };
  }
};

const operationBody = (data, userOperatorId, companyOperatorId) => ({
  description: data.description,
  comment: data.comment ? data.comment : null,
  statusOperationId: '60b10111a52ae400081fd0d0',
  // userClientId: '60ad08235b53c80008f2a0e4',
  companyClientId: data.companyClientId,
  userOperatorId,
  companyOperatorId,
  typeService: {
    typeServiceId: data.typeService._id,
    name: data.typeService.name,
  },
  dispatchType: {
    dispatchTypeId: data.dispatchType._id,
    dispatch: data.dispatchType.name,
  },
  placeRoute: {
    placeId: data.placeRoute._id,
    countryName: data.placeRoute.name,
  },
});

const operationRegister = (
  data,
  withOneTravel,
  withCarrierAssign,
  userOperatorId,
  companyOperatorId,
  markers
) => {
  return (dispatch) => {
    dispatch(request());
    const newData = operationBody(data, userOperatorId, companyOperatorId);
    let dataTravel = null;
    if (withOneTravel) {
      dataTravel = data.travel;
      dataTravel.checkPoints = markers;
    }
    // console.log(newData);
    // console.log(dataTravel);
    operationService.register(newData).then(
      (res) => {
        dispatch(success(res));
        if (withOneTravel) {
          const { _id } = res.operation;
          if (withCarrierAssign) {
            const { transportUnitId } = dataTravel.loadingOrder.assignment;
            dispatch(loadOrder.loadingOrderCreateDirect(dataTravel, _id, transportUnitId));
          } else {
            dispatch(loadOrder.loadOrderRegister(dataTravel, _id));
          }
        }
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operationConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: operationConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: operationConstants.REGISTER_FAILURE, error };
  }
};

const operationUpdate = (operationId, data, userOperatorId, companyOperatorId) => {
  return (dispatch) => {
    dispatch(request());
    const newData = operationBody(data, userOperatorId, companyOperatorId);
    // console.log(newData);
    operationService.update(operationId, newData).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operationConstants.UPDATE_REQUEST };
  }
  function success(res) {
    return { type: operationConstants.UPDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: operationConstants.UPDATE_FAILURE, error };
  }
};

const operationDashboard = (userId) => {
  return (dispatch) => {
    dispatch(request());
    operationService.getDashboard(userId).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: operationConstants.DASHBOARD_REQUEST };
  }
  function success(dashboard) {
    return { type: operationConstants.DASHBOARD_SUCCESS, dashboard };
  }
  function failure(error) {
    return { type: operationConstants.DASHBOARD_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: operationConstants.OFF_SUCCESS,
});

export const operation = {
  operationsList,
  operationDetails,
  operationRegister,
  operationUpdate,
  offSuccess,
  operationDashboard,
};
