import { mapsConstants } from '../constants';
import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAE8QygNNc0lhFs5oY0KtIJZoR17LDSJWM");
Geocode.setRegion("bo");
Geocode.setLocationType("ROOFTOP");

const geocoding = (literal, origen) => {

  return (dispatch) => {
    dispatch(request());
    Geocode.fromAddress(literal).then(
      (response) => {
        const result = { 'data': response, 'origen': origen }
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
    return { type: mapsConstants.GEOCODING_SUCCESS, result };
  }
  function failure(error) {
    return { type: mapsConstants.GEOCODING_FAILURE, error };
  }
};

const geofencing = (lat, lng, origen) => {
  console.log(lat, lng)
  return (dispatch) => {
    dispatch(request());

    // Get formatted address, city, state, country from latitude & longitude when
    // Geocode.setLocationType("ROOFTOP") enabled
    // the below parser will work for most of the countries
    Geocode.fromLatLng(lat, lng).then(

      (response) => {
        const address = response.results[0].formatted_address;

        let city, state, country;

        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);

        const results = { 
          'data': {
            'address': address,
            'city': city,
            'state': state,
            'country': country,
          },'origen': origen
        }
        dispatch(success(results));
      },
      (error) => {
        console.error(error);
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: mapsConstants.GEOFENCING_REQUEST };
  }
  function success(result) {
    return { type: mapsConstants.GEOFENCING_SUCCESS, result };
  }
  function failure(error) {
    return { type: mapsConstants.GEOFENCING_FAILURE, error };
  }
}
export const mapsAction = {
  geocoding,
  geofencing
};
