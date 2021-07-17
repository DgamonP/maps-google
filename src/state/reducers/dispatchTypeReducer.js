import { dispatchTypeConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  dispatchTypes: [],
  dispatchType: null,
  res: null,
  data: null,
  success: false,
};

export const dispatchTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case dispatchTypeConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case dispatchTypeConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dispatchTypeConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        dispatchTypes: action.dispatchTypes,
        data: null,
      };
    case dispatchTypeConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        dispatchTypes: [],
        error: action.error,
      };
    case dispatchTypeConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dispatchTypeConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        dispatchType: action.dispatchType,
      };
    case dispatchTypeConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        dispatchType: null,
        error: action.error,
      };
    case dispatchTypeConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case dispatchTypeConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case dispatchTypeConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case dispatchTypeConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case dispatchTypeConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case dispatchTypeConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case dispatchTypeConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case dispatchTypeConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case dispatchTypeConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case dispatchTypeConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
