import { mapsConstants } from '../constants';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAE8QygNNc0lhFs5oY0KtIJZoR17LDSJWM");
Geocode.setRegion("bo");
Geocode.setLocationType("ROOFTOP");

const geocoding = (literal, origen) => {

  return (dispatch) => {
    dispatch(request());
    Geocode.fromAddress(literal).then(
      ( response ) => {
        console.log("eocode.fromAddress", response)
        const result = { 'data': response, 'origen': origen}
        dispatch(success(result));
      },
      (error) => {
        console.log(error);
        dispatch(failure(error));
      }
    );
  };


  function request() {
    return { type: mapsConstants.GEOCODING_REQUEST };
  }
  function success(result) {
    return { type: mapsConstants.GEOCODING_SUCCESS, result  };
  }
  function failure(error) {
    return { type: mapsConstants.GEOCODING_FAILURE, error };
  }
};

export const mapsAction = {
  geocoding,
};
