import { boardingModeConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  boardingModes: [],
  boardingMode: null,
  res: null,
  data: null,
  success: false,
};

export const boardingModeReducer = (state = initialState, action) => {
  switch (action.type) {
    case boardingModeConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case boardingModeConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case boardingModeConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        boardingModes: action.boardingModes,
        data: null,
      };
    case boardingModeConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        boardingModes: [],
        error: action.error,
      };
    case boardingModeConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case boardingModeConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        boardingMode: action.boardingMode,
      };
    case boardingModeConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        boardingMode: null,
        error: action.error,
      };
    case boardingModeConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case boardingModeConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case boardingModeConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case boardingModeConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case boardingModeConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case boardingModeConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case boardingModeConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case boardingModeConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case boardingModeConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case boardingModeConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
