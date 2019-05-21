import React from 'react';
import { Map, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import { FILE_STORAGE_URL } from 'config';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const SinglePinMap = ({
    pin,
    zoom,
    user,
    drawing = {},
    pinHistory,
    historyVersion,
    historyCount
}) => (
    <>
        <BlockHeading title={`Pin ${pin.pinCode}`}>
            <h4 className="small-text">
                (History {historyVersion} of {historyCount}{' '}
                {historyVersion === historyCount
                    ? ' - Latest'
                    : +historyVersion === 1
                    ? ' - Earliest'
                    : ''}
                )
            </h4>
            {pin.nextPinID && (
                <ButtonContainer
                    className="pull-right"
                    to={`/client/pins/${pin.nextPinID}`}
                >
                    Next <i className="fa fa-arrow-right" />
                </ButtonContainer>
            )}
            {pin.prevPinID && (
                <ButtonContainer
                    className="pull-right"
                    to={`/client/pins/${pin.prevPinID}`}
                >
                    <i className="fa fa-arrow-left" />
                    Previous
                </ButtonContainer>
            )}
        </BlockHeading>

        <Map center={[pin.location.latY, pin.location.lngX]} zoom={zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                url={`${FILE_STORAGE_URL}/${
                    drawing.tilesetS3Key
                }/{z}/{x}/{y}.jpg`}
                noWrap={true}
            />
            <MapPin key={pin.id} pin={pin} pinHistory={pinHistory} />
        </Map>
        <p className="map-details">
            Last updated by: {`${user.userFirstName} ${user.userLastName} `}
            <DateTimeContainer date={pin.latestCreatedOn} />
        </p>
    </>
);

export default SinglePinMap;
