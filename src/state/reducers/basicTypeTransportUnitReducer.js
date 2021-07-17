import { basicTypeTransportUnitConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  basicTypeTransportUnits: [],
  basicTypeTransportUnit: null,
  res: null,
  data: null,
  success: false,
};

export const basicTypeTransportUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case basicTypeTransportUnitConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case basicTypeTransportUnitConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case basicTypeTransportUnitConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        basicTypeTransportUnits: action.basicTypeTransportUnits,
        data: null,
      };
    case basicTypeTransportUnitConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        basicTypeTransportUnits: [],
        error: action.error,
      };
    case basicTypeTransportUnitConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case basicTypeTransportUnitConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        basicTypeTransportUnit: action.basicTypeTransportUnit,
      };
    case basicTypeTransportUnitConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        basicTypeTransportUnit: null,
        error: action.error,
      };
    case basicTypeTransportUnitConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case basicTypeTransportUnitConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case basicTypeTransportUnitConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case basicTypeTransportUnitConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case basicTypeTransportUnitConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case basicTypeTransportUnitConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case basicTypeTransportUnitConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case basicTypeTransportUnitConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case basicTypeTransportUnitConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case basicTypeTransportUnitConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
