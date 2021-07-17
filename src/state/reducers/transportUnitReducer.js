import { transportUnitConstants } from '../constants';

const initialState = {
  loading: false,
  transportUnits: [],
  transportUnit: null,
  res: null,
  data: null,
};

export const transportUnitReducer = (state = initialState, action) => {
  switch (action.type) {
    case transportUnitConstants.GETBYID_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case transportUnitConstants.GETBYID_SUCCESS:
      return {
        ...state,
        loading: false,
        transportUnit: action.transportUnit,
        error: null,
      };
    case transportUnitConstants.GETBYID_FAILURE:
      return {
        ...state,
        loading: false,
        transportUnit: null,
        error: action.error,
      };
    case transportUnitConstants.SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case transportUnitConstants.SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        transportUnits: action.transportUnits,
        error: null,
      };
    case transportUnitConstants.SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        transportUnits: [],
        error: action.error,
      };
    default:
      return state;
  }
};
