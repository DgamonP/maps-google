import { taskConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  tasks: [],
  task: null,
  res: null,
  data: null,
  success: false,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case taskConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case taskConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.tasks,
        data: null,
      };
    case taskConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        tasks: [],
        error: action.error,
      };
    case taskConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case taskConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.task,
      };
    case taskConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        task: null,
        error: action.error,
      };
    case taskConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case taskConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case taskConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case taskConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case taskConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case taskConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case taskConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case taskConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case taskConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case taskConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    case taskConstants.APPROVE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case taskConstants.APPROVE_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.res,
        error: null,
      };
    case taskConstants.APPROVE_FAILURE:
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
