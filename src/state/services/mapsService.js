//import config from './config';
//const { axios, responseError } = config;

import Geocode from "react-geocode";
Geocode.setApiKey("AIzaSyAE8QygNNc0lhFs5oY0KtIJZoR17LDSJWM");
Geocode.setRegion("es");

//https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY
//https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY


const geocoding = (addr) => {
  return Geocode.
    fromAddress(addr)
    .then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        return response;
      },
      (error) => {
        console.error(error);
        return error;
      }
    );
  }


export const mapsService = {
  geocoding,
};