import { companyConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  companies: [],
  company: null,
  res: null,
  data: null,
  success: false,
};

export const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case companyConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case companyConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companyConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        companies: action.companies,
        data: null,
      };
    case companyConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        companies: [],
        error: action.error,
      };
    case companyConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case companyConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        company: action.company,
      };
    case companyConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        company: null,
        error: action.error,
      };
    case companyConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case companyConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case companyConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case companyConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case companyConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case companyConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case companyConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case companyConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case companyConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case companyConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
