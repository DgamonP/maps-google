import { operationStatusConstants } from '../constants';

const initialState = {
  loading: false,
  operationStates: [],
  operationStatus: null,
  res: null,
  data: null,
};

export const operationStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case operationStatusConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case operationStatusConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case operationStatusConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        operationStates: action.operationStates,
      };
    case operationStatusConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        operationStates: [],
        error: action.error,
      };
    case operationStatusConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case operationStatusConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        operationStatus: action.operationStatus,
      };
    case operationStatusConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        operationStatus: null,
        error: action.error,
      };
    case operationStatusConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case operationStatusConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.res,
        error: null,
      };
    case operationStatusConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        res: null,
        error: action.error,
      };
    default:
      return state;
  }
};
