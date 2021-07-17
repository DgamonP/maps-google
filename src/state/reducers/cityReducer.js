import { cityConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  cities: [],
  city: null,
  res: null,
  data: null,
  success: false,
};

export const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case cityConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case cityConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cityConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        cities: action.cities,
        data: null,
      };
    case cityConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        cities: [],
        error: action.error,
      };
    case cityConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case cityConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        city: action.city,
      };
    case cityConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        city: null,
        error: action.error,
      };
    case cityConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case cityConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case cityConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case cityConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case cityConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case cityConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case cityConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case cityConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case cityConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case cityConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
