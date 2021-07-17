import React from 'react';
import PropTypes from 'prop-types';

import { GoogleApiWrapper, InfoWindow, Map, Marker, Polygon, Polyline } from 'google-maps-react';

const C_MAP = (props) => {
  const { initialCenter, zoom, markers } = props;
  const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);
  const [activeMarker, setActiveMarker] = React.useState(null);

  var bounds = new props.google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    if (markers[i]) {
      bounds.extend(markers[i]);
    }
  }
  bounds.extend(initialCenter);

  const routeMap = (mapProps, map) => {

    let directionsService = new props.google.maps.DirectionsService();
    let directionsDisplay = new props.google.maps.DirectionsRenderer({
      polylineOptions: {
        strokeColor: 'linear-gradient(90deg, rgb(20%, 40%, 60%), rgb(60%, 20%, 40%))',
      },
    });

    console.log(markers)

    if (markers[0] && markers[1])
    directionsService.route(
      {
        origin: { lat: markers[0].lat, lng: markers[0].lng },
        destination: {
          lat: markers[1].lat,
          lng: markers[1].lng,
        },
        travelMode: props.google.maps.TravelMode.DRIVING,
      },
      function (resp, status) {
        if (status === props.google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(resp);
          directionsDisplay.setMap(map);
          directionsDisplay.setOptions({ suppressMarkers: true });
        }
      }
    );
  };

  return (
    <>
      <div style={{ width: '100%', height: 400, position: 'relative' }}>
        <Map
          google={props.google}
          zoom={zoom}
          onClick={routeMap}
          initialCenter={initialCenter}
          bounds={bounds}
          containerStyle={{ position: 'absolute', width: '100%', height: '100%' }}
          onDragend={(mapProps, map) => {
            // console.log(mapProps)
            // console.log(map)
          }}
        >
          {props.children}
          {/* { markers.map( (item, key) => {
                        return (
                            <Marker 
                                position={{ lat: item.lat, lng: item.lng, }}
                                title={"position_" + key}
                                name={"position_" + key}
                                key={key}
                                draggable
                                onDragend={ (event, map, clickEvent) => {
                                    item.lat = clickEvent.latLng.lat();
                                    item.lng = clickEvent.latLng.lng();
                                    setMakers( markers );
                                } }
                                onClick={ ( props, marker, e ) => {
                                    setShowingInfoWindow(true);
                                    setActiveMarker(marker);
                                }  }
                                // animation={props.google.maps.Animation.DROP}
                                icon={ {
                                    url: '/assets/svg/location.png',
                                    scale: 10, //tamaño
                                    strokeColor: 'yellow', //color del borde
                                    strokeWeight: 5, //grosor del borde
                                    fillColor: '#00f', //color de relleno
                                    fillOpacity:1,// opacidad del relleno
                                } }
                                // icon={{
                                //     path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                                //     fillColor: "blue",
                                //     // fillOpacity: 0.6,
                                //     // strokeWeight: 5,
                                //     // // rotation: 0,
                                //     // scale: 10,
                                //     // // anchor: props.google.maps.Point(15, 30),
                                // }}
                            >
                            </Marker>
                        );
                    } ) } */}

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>{' Pisition agregado'}</span>
            </div>
          </InfoWindow>
        </Map>
      </div>
    </>
  );
};


C_MAP.propTypes = {
  zoom: PropTypes.number,
  markers: PropTypes.array,

  initialCenter: PropTypes.object,

  onClickMarker: PropTypes.func,
};

C_MAP.defaultProps = {
  zoom: 13,
  markers: [],

  initialCenter: {
    lat: -17.8145819,
    lng: -63.1560853
  },
};

export default React.memo(
  GoogleApiWrapper({
    // apiKey: 'AIzaSyAofod0Bp0frLcLHVLxuacn0QBXqVyJ7lc',
    apiKey: 'AIzaSyAE8QygNNc0lhFs5oY0KtIJZoR17LDSJWM',
  })(C_MAP)
);
