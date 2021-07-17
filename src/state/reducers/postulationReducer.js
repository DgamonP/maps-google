import { postulationConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  postulations: [],
  postulation: null,
  res: null,
  success: false,
};

export const postulationReducer = (state = initialState, action) => {
  switch (action.type) {
    case postulationConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postulationConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        postulations: action.postulations,
        error: null,
      };
    case postulationConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        postulations: [],
        error: action.error,
      };
    case postulationConstants.ACCEPT_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case postulationConstants.ACCEPT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case postulationConstants.ACCEPT_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case postulationConstants.CONFIRMED_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postulationConstants.CONFIRMED_SUCCESS:
      return {
        ...state,
        loading: false,
        postulation: action.postulation,
        error: null,
      };
    case postulationConstants.CONFIRMED_FAILURE:
      return {
        ...state,
        loading: false,
        postulation: null,
        error: action.error,
      };
    case postulationConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
