import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import { FILE_STORAGE_URL } from 'config';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const SinglePinMap = ({
    pin,
    zoom,
    handleClick,
    user,
    drawing = {},
    moveMode,
    toggleMoveMode,
    editPinLocationPosition,
    handleEditPinLocation,
    pinHistory,
    historyVersion,
    historyCount,
    handleEditHistoryModal
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
            <button className="button yellow" onClick={handleEditHistoryModal}>
                <i className="far fa-pencil" /> Edit history
            </button>
            {moveMode ? (
                <>
                    <button
                        onClick={handleEditPinLocation}
                        className="button green pull-right"
                    >
                        <i className="fa fa-check" /> Confirm position
                    </button>
                    <button
                        className="button red pull-right"
                        onClick={toggleMoveMode}
                    >
                        Cancel
                    </button>
                </>
            ) : (
                <button className="button pull-right" onClick={toggleMoveMode}>
                    <i className="fa fa-arrows-alt" />
                    Edit pin location
                </button>
            )}

            {pin.nextPinID && (
                <ButtonContainer
                    className="pull-right"
                    to={`/company/pins/${pin.nextPinID}`}
                >
                    Next <i className="fa fa-arrow-right" />
                </ButtonContainer>
            )}
            {pin.prevPinID && (
                <ButtonContainer
                    className="pull-right"
                    to={`/company/pins/${pin.prevPinID}`}
                >
                    <i className="fa fa-arrow-left" />
                    Previous
                </ButtonContainer>
            )}
        </BlockHeading>

        <Map
            center={[pin.location.latY, pin.location.lngX]}
            zoom={zoom}
            minZoom={0}
            maxZoom={5}
            onClick={handleClick}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                url={`${FILE_STORAGE_URL}/${
                    drawing.tilesetS3Key
                }/{z}/{x}/{y}.jpg`}
                noWrap={true}
            />
            <MapPin key={pin.id} pin={pin} pinHistory={pinHistory} />

            {moveMode && <Marker position={editPinLocationPosition} />}
        </Map>
        <p className="map-details">
            Last updated by: {`${user.userFirstName} ${user.userLastName} `}
            <DateTimeContainer date={pin.latestCreatedOn} />
        </p>
    </>
);

export default SinglePinMap;
