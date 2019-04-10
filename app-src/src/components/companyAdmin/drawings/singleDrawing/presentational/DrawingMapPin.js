import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { PIN_STATUS_COLOURS as COLOURS } from 'constants/companyAdmin/enums';

const DrawingMapPin = ({
    pin: { id, location = {}, pinCode, latestStatus = '' }
}) => {
    const { latY = 1, lngX = 1 } = location;
    const MapMarker = L.Icon.extend({});

    const pinColour = COLOURS[latestStatus] || 'red';

    const icon = new MapMarker({
        iconSize: [24, 40],
        iconAnchor: [12, 40],
        popupAnchor: [0, -40],
        iconUrl: require(`_content/images/map-markers/${pinColour}-pin.png`),
        iconRetinaUrl: require(`_content/images/map-markers/${pinColour}-pin.png`)
    });

    return (
        <Marker key={id} position={[latY, lngX]} icon={icon}>
            <Popup>{`name: ${pinCode}`}</Popup>
        </Marker>
    );
};

export default DrawingMapPin;
