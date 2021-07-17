import { stageConstants } from '../constants';

const initialState = { loading: false, task: null, error: null, res: null };

export const stageReducer = (state = initialState, action) => {
  switch (action.type) {
    case stageConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case stageConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.res,
        error: null,
      };
    case stageConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        res: null,
        error: action.error,
      };
    case stageConstants.APPROVE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case stageConstants.APPROVE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        res: action.res,
        error: null,
      };
    case stageConstants.APPROVE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        res: null,
        error: action.error,
      };
    case stageConstants.GETTASK_BYIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case stageConstants.GETTASK_BYIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        task: action.task,
      };
    case stageConstants.GETTASK_BYIDS_FAILURE:
      return {
        ...state,
        loading: false,
        task: null,
        error: action.error,
      };
    default:
      return state;
  }
};
