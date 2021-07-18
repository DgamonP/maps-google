import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import { InfoWindow, Marker } from 'google-maps-react';


import C_MAP from '../../../components/map/map';

// Components
import DropdownInput from './Dropdowninput';

// Hooks

import useMarker from '../hooks/useMarker';


const defaultParams = [
    {
        key: 0,
        lat: '17.7749295',
        lng: '-122.4194155'    
    },
    {
        key: 1,
        lat: '37.7749295',
        lng: '-132.4194155'
    }
]
const MapsNew = ({ markers, geoFencing, icons, address, geoCoding, fullGeoResults }) => {


    // Search term from DropdownInput
    const [searchTermText, setSearchTermText] = useState('')


    const [ MarkerComponentA,
        setactiveMarkerA,
        activeMarkerA,
        showingInfoWindowA ] = useMarker(
            {
                geoFencing,
                icons,
                key:defaultParams[0].key,
                lat:defaultParams[0].lat,
                lng:defaultParams[0].lng
            }
        )


    const [ MarkerComponentB,
        setactiveMarkerB,
        activeMarkerB,
        showingInfoWindowB ] = useMarker({
            geoFencing,
            icons,
            key:defaultParams[1].key,
            lat:defaultParams[1].lat,
            lng:defaultParams[1].lng
        })

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

                <C_MAP markers={activeMarkerA}>

                    <MarkerComponentA/>
                    <MarkerComponentB/>

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