import { measurementUnitConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  measurementUnits: [],
  measurementUnit: null,
  res: null,
  data: null,
  success: false,
};

export const measurementUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case measurementUnitConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case measurementUnitConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case measurementUnitConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        measurementUnits: action.measurementUnits,
        data: null,
      };
    case measurementUnitConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        measurementUnits: [],
        error: action.error,
      };
    case measurementUnitConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case measurementUnitConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        measurementUnit: action.measurementUnit,
      };
    case measurementUnitConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        measurementUnit: null,
        error: action.error,
      };
    case measurementUnitConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case measurementUnitConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case measurementUnitConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case measurementUnitConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case measurementUnitConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case measurementUnitConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case measurementUnitConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case measurementUnitConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case measurementUnitConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case measurementUnitConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
