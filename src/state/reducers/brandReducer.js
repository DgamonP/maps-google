import { brandConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  brands: [],
  brand: null,
  res: null,
  data: null,
  success: false,
};

export const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case brandConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case brandConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        brands: action.brands,
        data: null,
      };
    case brandConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        brands: [],
        error: action.error,
      };
    case brandConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case brandConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        brand: action.brand,
      };
    case brandConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        brand: null,
        error: action.error,
      };
    case brandConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case brandConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case brandConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case brandConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case brandConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case brandConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case brandConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case brandConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case brandConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case brandConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
