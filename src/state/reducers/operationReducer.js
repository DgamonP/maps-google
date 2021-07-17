import { operationConstants } from '../constants';

const initialState = {
  loading: false,
  operations: [],
  operation: null,
  res: null,
  data: null,
  loadingAction: false,
  success: false,
  dashboard: null,
};

export const operationReducer = (state = initialState, action) => {
  switch (action.type) {
    case operationConstants.LOAD:
      return {
        ...state,
        data: {
          companyClientId: action.data.companyClientId,
          description: action.data.description,
          typeService: {
            _id: action.data.typeService.typeServiceId,
            name: action.data.typeService.name,
          },
          dispatchType: {
            _id: action.data.dispatchType.dispatchTypeId,
            name: action.data.dispatchType.dispatch,
          },
          placeRoute: {
            _id: action.data.placeRoute.placeId,
            name: action.data.placeRoute.countryName,
          },
        },
      };
    case operationConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
        data: null,
      };
    case operationConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        operations: action.operations,
        error: null,
      };
    case operationConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        operations: [],
        error: action.error,
      };
    case operationConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case operationConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        operation: action.operation,
        error: null,
      };
    case operationConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        operation: null,
        error: action.error,
      };
    case operationConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case operationConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case operationConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case operationConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case operationConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
        data: null,
      };
    case operationConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case operationConstants.DASHBOARD_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case operationConstants.DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        dashboard: action.dashboard,
        error: null,
      };
    case operationConstants.DASHBOARD_FAILURE:
      return {
        ...state,
        loading: false,
        dashboard: null,
        error: action.error,
      };
    case operationConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
