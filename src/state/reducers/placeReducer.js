import { placeConstants } from '../constants';

const initialState = {
  loading: false,
  loadingAction: false,
  places: [],
  place: null,
  res: null,
  data: null,
  success: false,
};

export const placeReducer = (state = initialState, action) => {
  switch (action.type) {
    case placeConstants.LOAD:
      return {
        ...state,
        data: action.data,
      };
    case placeConstants.LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case placeConstants.LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        places: action.places,
        data: null,
      };
    case placeConstants.LIST_FAILURE:
      return {
        ...state,
        loading: false,
        places: [],
        error: action.error,
      };
    case placeConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case placeConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        place: action.place,
        data: null,
      };
    case placeConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        place: null,
        error: action.error,
      };
    case placeConstants.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case placeConstants.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case placeConstants.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case placeConstants.UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case placeConstants.UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
        success: true,
      };
    case placeConstants.UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case placeConstants.ACTIVATE_DEACTIVATE_REQUEST:
      return {
        ...state,
        loading: true,
        loadingAction: true,
      };
    case placeConstants.ACTIVATE_DEACTIVATE_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: action.res,
        error: null,
      };
    case placeConstants.ACTIVATE_DEACTIVATE_FAILURE:
      return {
        ...state,
        loading: false,
        loadingAction: false,
        res: null,
        error: action.error,
      };
    case placeConstants.OFF_SUCCESS:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
};
