import { stagesTemplateConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  stagesTemplates: [],
  stagesTemplate: null,
  stageTemplate: null,
  res: null,
  data: null,
  success: false,
};

export const stagesTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case stagesTemplateConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case stagesTemplateConstants.LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case stagesTemplateConstants.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: null,
      };
    case stagesTemplateConstants.LOAD_FAILURE:
      return {
        ...state,
        loading: false,
        data: null,
        error: action.error,
      };
    case stagesTemplateConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
        stagesTemplate: null,
        success: false,
      };
    case stagesTemplateConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        stagesTemplates: action.stagesTemplates,
        error: null,
      };
    case stagesTemplateConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        stagesTemplates: [],
        error: action.error,
      };
    case stagesTemplateConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case stagesTemplateConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        stageTemplate: action.stageTemplate,
        data: action.data,
        error: null,
      };
    case stagesTemplateConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        stageTemplate: null,
        error: action.error,
      };
    case stagesTemplateConstants.GETBYIDS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case stagesTemplateConstants.GETBYIDS_SUCCESS:
      return {
        ...state,
        loading: false,
        stagesTemplate: action.stagesTemplate,
        error: null,
      };
    case stagesTemplateConstants.GETBYIDS_FAILURE:
      return {
        ...state,
        loading: false,
        stagesTemplate: null,
        error: action.error,
      };
    case stagesTemplateConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case stagesTemplateConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case stagesTemplateConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case stagesTemplateConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case stagesTemplateConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case stagesTemplateConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case stagesTemplateConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case stagesTemplateConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case stagesTemplateConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case stagesTemplateConstants.DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case stagesTemplateConstants.DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case stagesTemplateConstants.DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case stagesTemplateConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
