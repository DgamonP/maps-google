import { benefitConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  benefits: [],
  benefit: null,
  res: null,
  data: null,
  success: false,
};

export const benefitReducer = (state = initialState, action) => {
  switch (action.type) {
    case benefitConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case benefitConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case benefitConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        benefits: action.benefits,
        data: null,
      };
    case benefitConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        benefits: [],
        error: action.error,
      };
    case benefitConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case benefitConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        benefit: action.benefit,
      };
    case benefitConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        benefit: null,
        error: action.error,
      };
    case benefitConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case benefitConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case benefitConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case benefitConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case benefitConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case benefitConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case benefitConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case benefitConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case benefitConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case benefitConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
