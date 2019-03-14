import React from 'react';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const DrawingMapPin = ({ pin }) => {
    var MapMarker = L.Icon.extend({
        iconSize: [24, 27]
    });

    let pinIcon;

    switch (pin.status) {
        case 'Action Required':
            pinIcon = new MapMarker({
                iconUrl: require('_content/images/pins/red-pin.png'),
                iconRetinaUrl: require('_content/images/pins/red-pin.png')
            });
            break;
        case 'Installed':
            pinIcon = new MapMarker({
                iconUrl: require('_content/images/pins/green-pin.png'),
                iconRetinaUrl: require('_content/images/pins/green-pin.png')
            });
            break;
        case 'Inspected':
            pinIcon = new MapMarker({
                iconUrl: require('_content/images/pins/blue-pin.png'),
                iconRetinaUrl: require('_content/images/pins/blue-pin.png')
            });
            break;
        case 'No Action':
            pinIcon = new MapMarker({
                iconUrl: require('_content/images/pins/yellow-pin.png'),
                iconRetinaUrl: require('_content/images/pins/yellow-pin.png')
            });
            break;
        default:
            pinIcon = new MapMarker({
                iconUrl: require('_content/images/pins/red-pin.png'),
                iconRetinaUrl: require('_content/images/pins/red-pin.png')
            });
    }

    return (
        <Marker
            key={pin.id}
            position={[Number(pin.latitude), Number(pin.longitude)]}
            icon={pinIcon}
        >
            <Popup>{`name: ${pin.name}`}</Popup>
        </Marker>
    );
};

export default DrawingMapPin;
