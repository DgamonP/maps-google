import { typeTransportUnitConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  typeTransportUnits: [],
  typeTransportUnit: null,
  res: null,
  data: null,
  success: false,
  /* data: {
    description: 'update',
    currentFeatures: [
      {
        _id: '60b7945ff921a600083562a0',
        featuresTransportUnitId: '60b648828b16e5000ad00b6f',
        name: 'Chata con carpa',
        valueQualitative: 'de tela',
        valueId: '60b648828b16e5000ad00b71',
      },
      {
        _id: '60b7945ff921a600083562a1',
        featuresTransportUnitId: '60b648cc8b16e5000ad00b73',
        name: 'Remolque',
        valueQuantitative: 2,
        valueId: '60b648cc8b16e5000ad00b74',
      },
    ],
  }, */
};

export const typeTransportUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeTransportUnitConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case typeTransportUnitConstants.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case typeTransportUnitConstants.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case typeTransportUnitConstants.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };
    case typeTransportUnitConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case typeTransportUnitConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        typeTransportUnits: action.typeTransportUnits,
      };
    case typeTransportUnitConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        typeTransportUnits: [],
        error: action.error,
      };
    case typeTransportUnitConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case typeTransportUnitConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        typeTransportUnit: action.typeTransportUnit,
      };
    case typeTransportUnitConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        typeTransportUnit: null,
        error: action.error,
      };
    case typeTransportUnitConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case typeTransportUnitConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case typeTransportUnitConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case typeTransportUnitConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case typeTransportUnitConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case typeTransportUnitConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case typeTransportUnitConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case typeTransportUnitConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case typeTransportUnitConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case typeTransportUnitConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
