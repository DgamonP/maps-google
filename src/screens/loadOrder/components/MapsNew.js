import React, { useState } from 'react';

import { Grid, Text } from '@material-ui/core';

import { InfoWindow, Marker } from 'google-maps-react';


import C_MAP from '../../../components/map/map';

// Components
import DropdownInput from './Dropdowninput';


const MapsNew = ({ markers, geoFencing, icons, address, geoCoding, fullGeoResults }) => {

    const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);
    const [activeMarker, setActiveMarker] = React.useState(null);


    // Search term from DropdownInput
    const [searchTermText, setSearchTermText] = useState('')

    // List of locations from API
    const [locations, setLocations] = React.useState([]);


    // Control initial render for search do not triger
    const initial = React.useRef(true);


    React.useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }

        geoCoding(searchTermText, true);

    }, [geoCoding, searchTermText]);


    React.useEffect(() => {
        if (initial.current) {
            initial.current = false;
            return;
        }

        const timer = setTimeout(() => {
            // Set the locations to be the results of the dropdown
            setSearchTermText(() => (
                address.city + ', ' + address.state + ', ' + address.country
            ))
        }

            , 500)
        return () => clearTimeout(timer)

    }, [address]);


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
                                    onDragEnd={(event, map, clickEvent) => console.log(clickEvent)}
                                    onDragend={(event, map, clickEvent) => {

                                        item.lat = clickEvent.latLng.lat();
                                        item.lng = clickEvent.latLng.lng();
                                        //setMakers(markers);
                                        console.log("ACTIVE MARKER", item)
                                        geoFencing(item.lat, item.lng, true);
                                    }}
                                    onClick={(props, marker, e) => {
                                        setShowingInfoWindow(true);
                                        setActiveMarker(marker);
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
            {/* DROPDOWN INPUT */}
            <div > 
                <h1>
                    A
                </h1>
                <DropdownInput
                    setSearchTermText={setSearchTermText}
                    locations={fullGeoResults}
                    searchTermText={searchTermText}
                />
                <h1>
                    B
                </h1>
                <DropdownInput
                    setSearchTermText={setSearchTermText}
                    locations={fullGeoResults}
                    searchTermText={searchTermText}
                />
            </div>
         
        </Grid>
    )
}


export default MapsNew;