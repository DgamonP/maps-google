import { loadOrderStatusConstants } from '../constants';

const initialState = {
  loading: false,
  loadOrderStates: [],
  loadOrderStatus: null,
  res: null,
  data: null,
};

export const loadOrderStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case loadOrderStatusConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case loadOrderStatusConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case loadOrderStatusConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        loadOrderStates: action.loadOrderStates,
      };
    case loadOrderStatusConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        loadOrderStates: [],
        error: action.error,
      };
    case loadOrderStatusConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case loadOrderStatusConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        loadOrderStatus: action.loadOrderStatus,
      };
    case loadOrderStatusConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        loadOrderStatus: null,
        error: action.error,
      };
    case loadOrderStatusConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case loadOrderStatusConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.res,
        error: null,
      };
    case loadOrderStatusConstants.REGISTER_FAILURE:
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
