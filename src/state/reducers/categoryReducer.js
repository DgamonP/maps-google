import { categoryConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  categories: [],
  category: null,
  res: null,
  data: null,
  success: false,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case categoryConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.categories,
        data: null,
      };
    case categoryConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        categories: [],
        error: action.error,
      };
    case categoryConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        category: action.category,
      };
    case categoryConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        category: null,
        error: action.error,
      };
    case categoryConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case categoryConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case categoryConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case categoryConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case categoryConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case categoryConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case categoryConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case categoryConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case categoryConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case categoryConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
