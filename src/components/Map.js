import React, { useEffect, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import { staticMapUrl } from 'static-google-map';

import { get_static_style } from '../helpers/utils'

import { loadOrder } from '../state/actions';

import { mapStyle } from '../theme/mapStyle';


const containerStyle = {
  position: 'relative',
  height: '350px',
};

const zoom = 11;

const MapContainer = (props) => {
  const { google, travel } = props;
  const { route } = travel || {};
  const { checkPoints, origin, destination } = route || {};
  const { cityOrigin, countryOrigin } = origin || {}
  const { cityDestination, countryDestination } = destination || {}


  const origen = checkPoints ? Object.entries(checkPoints).map(obj => {
    if (Object.values(obj)[1].name === 'carguío') return { lat: Object.values(obj)[1].latitude, lng: Object.values(obj)[1].longitude }
  }).find(obj => (typeof obj !== 'undefined')) : { lat: 0, lon: 0 }

  const destino = checkPoints ? Object.entries(checkPoints).map(obj => {
    if (Object.values(obj)[1].name === 'descarguío') return { lat: Object.values(obj)[1].latitude, lng: Object.values(obj)[1].longitude }
  }).find(obj => (typeof obj !== 'undefined')) : { lat: 0, lon: 0 }

  const getPolyString = new Promise(resolve => resolve('...'));


  const [points, setPoints] = useState([origen, destino]);
  const [bounds, setBounds] = useState(null);
  const [showImg, setShowImg] = useState(true);
  const [showingInfo, setShowingInfo] = useState(false);
  /* Shows the active marker upon click */
  const [activeMarker, setActiveMarker] = useState({});
  /* Shows the InfoWindow to the selected place upon a marker */
  const [selectedPlace, setSelectedPlace] = useState({});
  const [loading_checkpoints, setLoadingCheckPoints] = useState(false);

  useEffect(() => {
    if (points.length === 0 && typeof route !== 'undefined') {
      let help = [origen, destino];
      setPoints(help);
    }
  }, [points, route, origen, destino]);

  const adjustMap = (mapProps, map) => {

    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: 'linear-gradient(90deg, rgb(20%, 40%, 60%), rgb(60%, 20%, 40%))',
      },
    });

    directionsService.route(
      {
        origin: { lat: checkPoints[0].latitude, lng: checkPoints[0].longitude },
        destination: {
          lat: checkPoints[checkPoints.length - 1].latitude,
          lng: checkPoints[checkPoints.length - 1].longitude,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      function (resp, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(resp);
          directionsDisplay.setMap(map);
          directionsDisplay.setOptions({ suppressMarkers: true });
          setLoadingCheckPoints(true);
        }
      }
    );
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setActiveMarker(marker);
    setShowingInfo(true);
  };

  const onClose = () => {
    if (showingInfo) {
      setShowingInfo(false);
      setActiveMarker(null);
    }
  };

  if (showImg) {
    if (!travel) {
      return (
        <Grid container justify='center' style={{ marginBottom: 10 }}>
          <Typography>No hay ordenes de carga</Typography>
        </Grid>
      );
    } else if (points.length === 0) {
      return (
        <Grid container justify='center' style={{ marginBottom: 10 }}>
          <CircularProgress />
        </Grid>
      );
    } else {
      const arrayMap = [{
        location: { lat: destino.lat, lng: destino.lng },
        iconURL: encodeURI('http://deltacargosrlbeta.online/wp-content/uploads/2021/06/marker_descarguio_64.png'),
        size: 'mid',
      },
      {
        location: { lat: origen.lat, lng: origen.lng },
        iconURL: encodeURI('http://deltacargosrlbeta.online/wp-content/uploads/2021/06/marker_carguio_64.png'),
        size: 'mid',
      }];

      const urlStaticMap = staticMapUrl({
        key: 'AIzaSyAE8QygNNc0lhFs5oY0KtIJZoR17LDSJWM',
        scale: 2,
        //style: get_static_style(mapStyle),
        size: '600x600',
        format: 'png',
        maptype: 'roadmap',
        markers: arrayMap,
        paths: [
          {
            color: 'black',
            points: [origen.lat + ',' + origen.lng, destino.lat + ',' + destino.lng]
          }
        ]
      });

      return (
        <Grid container justify='flex-start'>
          <img
            width='350px'
            height='350px'
            src={urlStaticMap}
            alt='imgMap'
            onClick={() => setShowImg(false)}
          />
        </Grid>
      );
    }
  } else {

    return (
      <Map
        google={google}
        zoom={zoom}
        containerStyle={containerStyle}
        bounds={bounds}
        onReady={adjustMap}
      >
        <Marker
          onClick={onMarkerClick}
          name={cityOrigin + ", " + countryOrigin}
          position={origen}
          icon={{
            url: encodeURI('http://deltacargosrlbeta.online/wp-content/uploads/2021/06/marker_carguio_64.png'),
          }} />

        <Marker
          onClick={onMarkerClick}
          name={cityDestination + ", " + countryDestination}
          position={destino}
          icon={{
            url: encodeURI('http://deltacargosrlbeta.online/wp-content/uploads/2021/06/marker_descarguio_64.png'),
          }}
        />

        <InfoWindow marker={activeMarker} visible={showingInfo} onClose={onClose}>
          <div>
            <h5>{selectedPlace.name}</h5>
          </div>
        </InfoWindow>

      </Map>
    );
  }
};

const mapStateToProps = (state) => {
  const { travel } = state.loadOrder;
  return { travel };
};

const actionCreators = {
  details: loadOrder.operationDetails,
};

export default connect(
  mapStateToProps,
  actionCreators
)(
  GoogleApiWrapper({
    apiKey: 'AIzaSyAE8QygNNc0lhFs5oY0KtIJZoR17LDSJWM',
  })(MapContainer)
);
