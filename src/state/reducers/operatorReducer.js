import { operatorConstants } from '../constants';

const initialState = {
  loading: false,
  // loadingList: false,
  loadingAction: false,
  operators: [],
  operator: null,
  res: null,
  data: null,
  success: false,
};

export const operatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case operatorConstants.LOAD:
      const pos = action.data.profile.documentId.indexOf('_');
      const stateId = action.data.profile.documentId.substring(
        pos + 1,
        action.data.profile.documentId.length
      );
      const { profile } = action.data;
      return {
        ...state,
        data: {
          ...action.data,
          profile: {
            ...profile,
            documentId: profile.documentId.substring(0, pos),
          },
          states: stateId,
          // states: 'SC',
        },
      };
    case operatorConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
        // loadingList: true,
      };
    case operatorConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        // loadingList: false,
        operators: action.operators,
        error: null,
      };
    case operatorConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        // loadingList: false,
        operators: [],
        error: action.error,
      };
    case operatorConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case operatorConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        operator: action.operator,
        error: null,
        // data: action.operator.roles,
      };
    case operatorConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        operator: null,
        error: action.error,
      };
    case operatorConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case operatorConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case operatorConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case operatorConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case operatorConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case operatorConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case operatorConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case operatorConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case operatorConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case operatorConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
