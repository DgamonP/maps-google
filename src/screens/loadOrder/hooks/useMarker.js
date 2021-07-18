import React from 'react';
import { Marker, InfoWindow } from 'google-maps-react';

const useMarker = ({geoFencing, icons, key, lat, lng}) => {


    const [item, setItem] = React.useState({lat, lng});

    const [showingInfoWindow, setShowingInfoWindow] = React.useState(false);

    const MarkerComponent = (props) => {
        return (
            <>
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
                        console.log(marker);
                        setShowingInfoWindow(true);
                        setItem(marker);
                    }}
                    icon={{
                        url: icons[key],
                        scale: 10,
                    }}
                ></Marker>

                <InfoWindow marker={item} visible={showingInfoWindow}>
                    <div>
                        <span style={{ padding: 0, margin: 0 }}>{' Position agregado'}</span>
                    </div>
                </InfoWindow>
            </>
        )
    }

    return [MarkerComponent, setItem, item]
}


export default useMarker;