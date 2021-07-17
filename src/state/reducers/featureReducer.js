import { featureConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  features: [],
  feature: null,
  res: null,
  data: null,
  success: false,
};
// dss6
export const featureReducer = (state = initialState, action) => {
  switch (action.type) {
    case featureConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case featureConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case featureConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        features: action.features,
        data: null,
      };
    case featureConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        features: [],
        error: action.error,
      };
    case featureConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case featureConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        feature: action.feature,
      };
    case featureConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        feature: null,
        error: action.error,
      };
    case featureConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case featureConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case featureConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case featureConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case featureConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case featureConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case featureConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case featureConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case featureConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case featureConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
