import React from 'react';

import { Grid } from '@material-ui/core';

import { InfoWindow, Marker } from 'google-maps-react';


import C_MAP from '../../../components/map/map';


const Maps = ({ markers, geoFencing, icons }) => {

    const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);
    const [activeMarker, setActiveMarker] = React.useState(null);


    return (
        <Grid container direction={'row'}>
            <Grid item sm={6} xs={12}>

                {/* MAP Component */}

                <C_MAP markers={markers}>
                    {markers.map((item, key) => {
                        if (item) {
                            return (
                                <Marker
                                    position={{ lat: item.lat, lng: item.lng }}
                                    title={'position_' + key}
                                    name={'position_' + key}
                                    key={key}
                                    draggable
                                    onDragend={(event, map, clickEvent) => {

                                        item.lat = clickEvent.latLng.lat();
                                        item.lng = clickEvent.latLng.lng();
                                        //setMakers(markers);
                                        console.log("ACTIVE MARKER", item)
                                        geoFencing(item.lat, item.lng, true);
                                    }}
                                    onClick={(props, marker, e) => {
                                        setShowingInfoWindow(true);
                                        //setActiveMarker(marker);
                                    }}
                                    icon={{
                                        url: icons[key],
                                        scale: 10,
                                    }}
                                ></Marker>
                            );
                        }

                        return null;
                    })}
                    <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                        <div>
                            <span style={{ padding: 0, margin: 0 }}>{' Position agregado'}</span>
                        </div>
                    </InfoWindow>
                </C_MAP>


            </Grid>
        </Grid>
    )
}


export default Maps;