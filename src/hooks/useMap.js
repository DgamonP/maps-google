
import React from 'react';
import googleMaps from 'google-maps-react';

// googleMaps.GoogleApiWrapper( {
//     apiKey: 'AIzaSyAofod0Bp0frLcLHVLxuacn0QBXqVyJ7lc',
// } );

export const UseMap = ( puntoInicial ) => {

    const mapRef = React.useRef();

    const setRefMaps = React.useCallback( (node) => {
        mapRef.current = node;
    }, [] );

    const markers = React.useRef( {} );

    React.useEffect( () => {
        let map = new googleMaps.Map( {
            style: {width: '100%', height: '100%', position: 'relative'},
            center: {
                lat: puntoInicial.lat,
                lng: puntoInicial.lng,
            },
            zoom: puntoInicial.zoom,

        } );
        mapRef.current = map;
    }, [ puntoInicial ] );


    return {
        markers,
        setRefMaps,
    };

};

// export default  googleMaps.GoogleApiWrapper( {
//     apiKey: 'AIzaSyAofod0Bp0frLcLHVLxuacn0QBXqVyJ7lc',
// } )( UseMap );


