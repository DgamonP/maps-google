import { mapsConstants } from '../constants';

const initialState = {
  loading: false,
  address: {},
};

export const mapsGeoFencingReducer = (state = initialState, action) => {
  switch (action.type) {
    case mapsConstants.GEOFENCING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case mapsConstants.GEOFENCING_SUCCESS:
      return {
        ...state,
        loading: false,
        address: action.result.data,
      };
    case mapsConstants.GEOFENCING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};