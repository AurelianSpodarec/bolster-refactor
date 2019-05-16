import React from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import {
    PIN_STATUS_COLOURS as COLOURS,
    PIN_STATUS_TYPES,
    DATE_TIME_DEFAULTS,
    DATE_TIME_IDS
} from 'constants/companyAdmin/enums';
import CustomPin from './CustomPin';
import ReactDOMServer from 'react-dom/server';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const DrawingMapPin = ({
    pin: {
        id,
        location = {},
        pinCode,
        latestStatus = '',
        createdOn,
        latestCreatedOn,
        ...rest
    },
    pinHistory = {},
    history,
    isReport
}) => {
    const { latY = 1, lngX = 1 } = location;
    console.log(createdOn, latestCreatedOn);
    console.log(rest);
    const pinColour = COLOURS[pinHistory.status || latestStatus] || 'red';
    const dateTime = time =>
        moment(time).format(DATE_TIME_DEFAULTS[DATE_TIME_IDS.DATETIME]);
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
        <TooltipContainer text="hello">
            <Marker
                key={id}
                position={[latY, lngX]}
                icon={divIcon}
                onClick={() => isReport && history.push('/company/pins/' + id)}
            >
                <Tooltip>
                    {`${pinCode}`} <br /> Created:{' '}
                    <DateTimeContainer date={createdOn} />
                    <br />
                    {dateTime(latestCreatedOn) !== dateTime(createdOn) && (
                        <>
                            Updated:{' '}
                            <DateTimeContainer date={latestCreatedOn} /> <br />
                        </>
                    )}
                    Status:{' '}
                    {PIN_STATUS_TYPES[pinHistory.status || latestStatus]}
                </Tooltip>
            </Marker>
        </TooltipContainer>
    );
};

export default withRouter(DrawingMapPin);
