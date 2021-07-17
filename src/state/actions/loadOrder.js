import moment from 'moment';
import { loadOrderConstants } from '../constants';
import { loadOrderService } from '../services';
import { postulation } from './postulation';
import { stage } from './stage';
import { transportUnit } from './transportUnit';

const load = (data) => ({ type: loadOrderConstants.LOAD, data });

const loadData = (loadOrderId, freightValue) => {
  return (dispatch) => {
    dispatch(request());
    loadOrderService.getById(loadOrderId).then(
      (loadOrder) => {
        const { travel } = loadOrder;
        /* es lo mas adecuado? */
        const data = {
          weightUnit: {},
          volumeUnit: {},
          carrierFreight: {},
          volumeUnitValue: travel.volumeUnit.value,
          weightUnitValue: travel.weightUnit.value,
        };
        data.weightUnit._id = travel.weightUnit.weightUnitId;
        data.weightUnit.name = travel.weightUnit.name;
        data.weightUnit.abbreviation = travel.weightUnit.abbreviation;
        data.weightUnit.type = 'Peso';
        data.volumeUnit._id = travel.volumeUnit.volumeUnitId;
        data.volumeUnit.name = travel.volumeUnit.name;
        data.volumeUnit.abbreviation = travel.volumeUnit.abbreviation;
        data.volumeUnit.type = 'Volumen';
        data.carrierFreight.freightValue = freightValue;
        data.carrierFreight.invoice = travel.freightValues.freightOffered.invoice;
        data.carrierFreight.typeCurrencyFreightId =
          travel.freightValues.freightOffered.typeCurrencyOfferedId;
        console.log(freightValue, data);
        dispatch(success(data));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.LOAD_REQUEST };
  }
  function success(data) {
    return { type: loadOrderConstants.LOAD_SUCCESS, data };
  }
  function failure(error) {
    return { type: loadOrderConstants.LOAD_FAILURE, error };
  }
};

const loadOrdersList = (operationId) => {
  return (dispatch) => {
    dispatch(request());
    loadOrderService.getAll(operationId).then(
      (loadOrders) => {
        dispatch(success(loadOrders.travels));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.LIST_REQUEST };
  }
  function success(loadOrders) {
    return { type: loadOrderConstants.LIST_SUCCESS, loadOrders };
  }
  function failure(error) {
    return { type: loadOrderConstants.LIST_FAILURE, error };
  }
};

const loadOrderDetails = (loadOrderId) => {
  return (dispatch) => {
    dispatch(request());
    loadOrderService.getById(loadOrderId).then(
      (res) => {
        dispatch(success(res.travel));
        dispatch(load(res.travel));
        if (res.travel.loadingOrder.assignment.transportUnitId) {
          dispatch(
            transportUnit.transportUnitDetails(res.travel.loadingOrder.assignment.transportUnitId)
          );
        } else {
          dispatch(postulation.postulationConfirmedDetails(loadOrderId));
        }
        if (res.travel.loadingOrder.loadingOrderId) {
          /* enviar all o last */
          dispatch(loadOrderGetCheckpoints(res.travel.loadingOrder.loadingOrderId, 'last'));
        }
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.GETBYID_REQUEST };
  }
  function success(travel) {
    return { type: loadOrderConstants.GETBYID_SUCCESS, travel };
  }
  function failure(error) {
    return { type: loadOrderConstants.GETBYID_FAILURE, error };
  }
};

const newDataForBody = (data, operationId) => ({
  operationId,
  publish: false,
  typeTransportUnitLabel: data.typeTransportUnitLabel,
  dates: {
    loadingDate: moment(data.dates.loadingDate).format('YYYY-MM-DD') + 'T04:00:00.000Z',
    deliveryDate: moment(data.dates.deliveryDate).format('YYYY-MM-DD') + 'T04:00:00.000Z',
  },
  // features
  volumeUnit: {
    volumeUnitId: data.volumeUnit._id,
    name: data.volumeUnit.name,
    abbreviation: data.volumeUnit.abbreviation,
    value: parseInt(data.volumeUnitValue),
  },
  weightUnit: {
    weightUnitId: data.weightUnit._id,
    name: data.weightUnit.name,
    abbreviation: data.weightUnit.abbreviation,
    value: parseInt(data.weightUnitValue),
  },
  categoryLoad: {
    categoryLoadId: data.categoryLoad._id,
    name: data.categoryLoad.name,
  },
  boardingMode: {
    boardingModeId: data.boardingMode._id,
    name: data.boardingMode.name,
  },
  freightValues: {
    clientFreight: {
      typeCurrencyFreightId: data.freightValues.clientFreight.typeCurrencyFreightId,
      freightValue: parseInt(data.freightValues.clientFreight.freightValue),
      marginGain:
        data.freightValues.clientFreight.freightValue - data.freightValues.freightOffered.value,
      invoice: data.freightValues.clientFreight.invoice ? true : false,
    },
    freightOffered: {
      typeCurrencyOfferedId: data.freightValues.freightOffered.typeCurrencyOfferedId,
      invoice: data.freightValues.freightOffered.invoice ? true : false,
      value: parseInt(data.freightValues.freightOffered.value),
    },
  },
  origin: {
    PlaceId: data.origin.PlaceId,
    stateOriginId: data.origin._id,
    stateOrigin: data.origin.name,
    cityOriginId: data.originCity._id,
    direction: data.directionOrigin,
  },
  destination: {
    PlaceId: data.destination.PlaceId,
    stateDestinationId: data.destination._id,
    stateDestination: data.destination.name,
    cityDestinationId: data.destinationCity._id,
    directionDestination: data.directionDestination,
  },
  checkPoints: data.checkPoints.map((item, index) => ({
    latitude: item.lat,
    longitude: item.lng,
    name: index === data.checkPoints.length - 1 ? 'descarguío' : 'carguío',
    km: 50,
    type: index === data.checkPoints.length - 1 ? 'B' : 'A',
  })),
});

const loadOrderRegister = (data, operationId) => {
  return (dispatch) => {
    dispatch(request());
    const newData = newDataForBody(data, operationId);
    // console.log(newData);
    loadOrderService.register(newData).then(
      (res) => {
        alert(res.message);
        dispatch(success(res));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.REGISTER_REQUEST };
  }
  function success(res) {
    return { type: loadOrderConstants.REGISTER_SUCCESS, res };
  }
  function failure(error) {
    return { type: loadOrderConstants.REGISTER_FAILURE, error };
  }
};

/* publica el travel (oportunidad) */
const loadOrderPublish = (travelId, data) => {
  return (dispatch) => {
    dispatch(request());
    loadOrderService.publish(travelId, data).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        dispatch(loadOrderDetails(travelId, []));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.PUBLISH_REQUEST };
  }
  function success(res) {
    return { type: loadOrderConstants.PUBLISH_SUCCESS, res };
  }
  function failure(error) {
    return { type: loadOrderConstants.PUBLISH_FAILURE, error };
  }
};

const loadingOrderCreate = (travelId, data, transportUnitId) => {
  return (dispatch) => {
    dispatch(request());
    const newData = {
      packaging: data.packaging,
      carrierFreight: {
        typeCurrencyFreightId: data.carrierFreight.typeCurrencyFreightId,
        freightValue: parseInt(data.carrierFreight.freightValue),
        invoice: !data.carrierFreight.invoice ? false : true,
      },
      assignment: {
        assignmentStatus: 1,
        transportUnitId,
      },
      weightUnit: {
        weightUnitId: data.weightUnit._id,
        name: data.weightUnit.name,
        abbreviation: data.weightUnit.abbreviation,
        value: parseInt(data.weightUnitValue),
      },
      VolumeUnit: {
        volumeUnitId: data.volumeUnit._id,
        name: data.volumeUnit.name,
        abbreviation: data.volumeUnit.abbreviation,
        value: parseInt(data.volumeUnitValue),
      },
    };
    console.log(newData);
    loadOrderService.createLoadingOrder(travelId, newData).then(
      (res) => {
        dispatch(success(res));
        /* create stages */
        const { operation, loadingOrderId } = res;
        const { dispatchType, typeService, placeRoute } = operation;
        const body = { loadingOrderId };
        dispatch(
          stage.stageRegister(
            dispatchType.dispatchTypeId,
            typeService.typeServiceId,
            placeRoute.placeId,
            body,
            travelId
          )
        );
        // dispatch(loadOrderDetails(travelId, []));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.LOADING_ORDER_CREATE_REQUEST };
  }
  function success(res) {
    return { type: loadOrderConstants.LOADING_ORDER_CREATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: loadOrderConstants.LOADING_ORDER_CREATE_FAILURE, error };
  }
};

const loadOrderLiquidate = (travelId) => {
  return (dispatch) => {
    dispatch(request());
    loadOrderService.liquidate(travelId).then(
      (res) => {
        dispatch(success(res));
        dispatch(loadOrderDetails(travelId, []));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.LIQUIDATE_REQUEST };
  }
  function success(res) {
    return { type: loadOrderConstants.LIQUIDATE_SUCCESS, res };
  }
  function failure(error) {
    return { type: loadOrderConstants.LIQUIDATE_FAILURE, error };
  }
};

const loadOrderGetCheckpoints = (loadingOrderId, type) => {
  return (dispatch) => {
    dispatch(request());
    loadOrderService.getCheckpoints(loadingOrderId, type).then(
      (res) => {
        dispatch(success(res.checkPoints));
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.CHECKPOINTS_REQUEST };
  }
  function success(checkpoints) {
    return { type: loadOrderConstants.CHECKPOINTS_SUCCESS, checkpoints };
  }
  function failure(error) {
    return { type: loadOrderConstants.CHECKPOINTS_FAILURE, error };
  }
};

const loadingOrderCreateDirect = (data, operationId, transportUnitId) => {
  return (dispatch) => {
    dispatch(request());
    const newData = newDataForBody(data, operationId);
    newData.loadingOrder = {
      packaging: data.packaging,
      assignment: {
        assignmentStatus: 1,
        transportUnitId,
      },
    };
    loadOrderService.createLoadingOrderDirect(newData).then(
      (res) => {
        // alert(res.message);
        dispatch(success(res));
        const { operation, loadingOrderId, travel } = res;
        const { dispatchType, typeService, placeRoute } = operation;
        const body = { loadingOrderId };
        dispatch(
          stage.stageRegister(
            dispatchType.dispatchTypeId,
            typeService.typeServiceId,
            placeRoute.placeId,
            body,
            travel._id
          )
        );
      },
      (error) => {
        alert(error.errorMessage);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: loadOrderConstants.LOADING_ORDER_CREATE_DIRECT_REQUEST };
  }
  function success(res) {
    return { type: loadOrderConstants.LOADING_ORDER_CREATE_DIRECT_SUCCESS, res };
  }
  function failure(error) {
    return { type: loadOrderConstants.LOADING_ORDER_CREATE_DIRECT_FAILURE, error };
  }
};

const offSuccess = () => ({
  type: loadOrderConstants.OFF_SUCCESS,
});

export const loadOrder = {
  load,
  loadData,
  loadOrdersList,
  loadOrderDetails,
  loadOrderRegister,
  loadOrderPublish,
  loadingOrderCreate,
  loadOrderLiquidate,
  loadingOrderCreateDirect,
  offSuccess,
};
