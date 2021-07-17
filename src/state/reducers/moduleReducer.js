import { moduleConstants } from '../constants';

const initialState = { loading: false, modules: [], module: {}, res: null };

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    case moduleConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case moduleConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        modules: action.modules,
      };
    case moduleConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        modules: [],
        error: action.error,
      };
    /* case moduleConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case moduleConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        module: action.module,
      };
    case moduleConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        module: {},
        error: action.error,
      };
    case moduleConstants.CREATE_BEGIN: {
      return {
        ...state,
        loading: false,
        module: action.payload,
      };
    }
    case moduleConstants.CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        module: action.payload,
      };
    case moduleConstants.CREATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case moduleConstants.UPDATE_BEGIN: {
      return {
        ...state,
        module: { ...state.module, auth: action.payload },
      };
    }
    case moduleConstants.UPDATE_SUCCESS:
      return {
        ...state,
        module: { ...state.module, auth: action.payload },
      };
    case moduleConstants.UPDATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      }; */
    default:
      return state;
  }
};
