import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { Marker } from 'react-leaflet';

const MergeMapPin = ({point, name}) => {
    const redPin = require('_content/images/map-markers/red-pin2x.png');
    const bluePin = require('_content/images/map-markers/blue-pin2x.png');
    const pin = name === 'A' ? redPin : bluePin;

    const divIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(
            <div className="custom-pin">
                <img alt={name} src={pin} />
                <div className="code">
                    <p className="code-full">{name}</p>
                </div>
            </div>
        ),
        iconSize: [30, 50],
        iconAnchor: [15,50],
    });


    const { latY = 0, lngX = 0 } = point;
    return (
    <>
        <Marker
            position={[latY, lngX]}
            icon={divIcon}
            onClick={() => {}}
        />
    </>
    );
};

export default MergeMapPin;