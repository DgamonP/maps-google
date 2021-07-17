import { newConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  news: [],
  new: null,
  res: null,
  data: null,
  success: false,
};

export const newReducer = (state = initialState, action) => {
  switch (action.type) {
    case newConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case newConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case newConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        news: action.news,
        data: null,
      };
    case newConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        news: [],
        error: action.error,
      };
    case newConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case newConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        new: action.new,
      };
    case newConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        new: null,
        error: action.error,
      };
    case newConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case newConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case newConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case newConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case newConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case newConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case newConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case newConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case newConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case newConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
