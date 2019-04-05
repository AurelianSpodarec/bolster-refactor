import React from 'react';
// import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const DrawingMapPin = ({ pin: { id, location, pinCode } }) => {
    // const MapMarker = L.Icon.extend({
    //     iconSize: [24, 27]
    // });

    // const pinColours = {
    //     'action required': 'red',
    //     installed: 'green',
    //     inspected: 'blue',
    //     'no action': 'yellow'
    // };

    // const { status = '' } = pin;
    // const pinColour = pinColours[status.toLowerCase()] || 'red';

    // const icon = new MapMarker({
    //     iconUrl: require(`_content/images/pins/${pinColour}-pin.png`),
    //     iconRetinaUrl: require(`_content/images/pins/${pinColour}-pin.png`)
    // });

    return (
        <Marker
            key={id}
            position={[location.latY, location.lngX]}
            // icon={icon}
        >
            <Popup>{`name: ${pinCode}`}</Popup>
        </Marker>
    );
};

export default DrawingMapPin;
