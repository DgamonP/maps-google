import { typeServiceConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  typeServices: [],
  typeService: null,
  res: null,
  data: null,
  success: false,
};
// dss6
export const typeServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case typeServiceConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case typeServiceConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case typeServiceConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        typeServices: action.typeServices,
        data: null,
      };
    case typeServiceConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        typeServices: [],
        error: action.error,
      };
    case typeServiceConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case typeServiceConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        typeService: action.typeService,
      };
    case typeServiceConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        typeService: null,
        error: action.error,
      };
    case typeServiceConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case typeServiceConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case typeServiceConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case typeServiceConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case typeServiceConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case typeServiceConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case typeServiceConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case typeServiceConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case typeServiceConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case typeServiceConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
