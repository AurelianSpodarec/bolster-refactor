import React from 'react';
import { withRouter } from 'react-router-dom';

import L from 'leaflet';
import { Marker } from 'react-leaflet';
import { PIN_STATUS_COLOURS as COLOURS } from 'constants/companyAdmin/enums';
import CustomPin from './CustomPin';
import ReactDOMServer from 'react-dom/server';

const DrawingMapPin = ({
    pin: { id, location = {}, pinCode, latestStatus = '' },
    pinHistory = {},
    history,
    isReport
}) => {
    const { latY = 1, lngX = 1 } = location;

    const pinColour = COLOURS[pinHistory.status || latestStatus] || 'red';

    const divIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(
            <CustomPin
                pinColour={pinColour}
                pinCode={pinCode}
                pinID={id}
                history={pinHistory}
            />
        ),
        iconSize: [24, 40],
        iconAnchor: [12, 40],
        popupAnchor: [0, -40]
    });

    return (
        <Marker
            key={id}
            position={[latY, lngX]}
            icon={divIcon}
            onClick={() =>
                isReport ? null : history.push('/company/pins/' + id)
            }
        />
    );
};

export default withRouter(DrawingMapPin);
