import { mapsConstants } from '../constants';

const initialState = {
  loading: false,
  markers: [null,null],
  icons:['http://deltacargosrlbeta.online/wp-content/uploads/2021/06/marker_carguio_64.png',
  'http://deltacargosrlbeta.online/wp-content/uploads/2021/06/marker_descarguio_64.png']
};

export const mapsReducer = (state = initialState, action) => {
  switch (action.type) {
    case mapsConstants.GEOCODING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case mapsConstants.GEOCODING_SUCCESS:
      return {
        ...state,
        loading: false,
        markers: [action.result.origen ? action.result.data.results[0].geometry.location : state.markers[0],
        !action.result.origen ? action.result.data.results[0].geometry.location : state.markers[1]],
        fullGeoResults: action.result.data.results,
      };
    case mapsConstants.GEOCODING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};