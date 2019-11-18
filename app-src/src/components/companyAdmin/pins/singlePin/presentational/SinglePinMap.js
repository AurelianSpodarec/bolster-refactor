import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import { CRS } from 'leaflet';
import ReactDOMServer from 'react-dom/server';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import { FILE_STORAGE_URL } from 'config';
import { Link } from 'react-router-dom';
import { PIN_STATUS_COLOURS as COLOURS } from 'constants/companyAdmin/enums';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import CustomPin from 'components/shared/pins/map/presentational/CustomPin';
import SinglePinGenerateReportContainer from '../containers/SinglePinGenerateReportContainer';

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
    history,
    onMobile
}) => {
    const status = pinHistory.status;
    const pinColour = COLOURS[status] || 'red';
    const newPinIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(<CustomPin pinColour={pinColour} history={history} />),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50]
    });
    return (
        <>
            <BlockHeading
                title={`Pin ${pin.pinCode}`}
                classes={`${onMobile ? 'mobile-buttons' : ''}`}
            >
                <SinglePinGenerateReportContainer pinID={pin.id} />
                <Link className="button green" to={`/company/pins/${pin.id}/add-history`}>
                    <i className="fa fa-plus" /> Add Pin History
                </Link>
                {moveMode ? (
                    <>
                        <button onClick={handleEditPinLocation} className="button green pull-right">
                            <i className="fa fa-check" /> Confirm position
                        </button>
                        <button className="button red pull-right" onClick={toggleMoveMode}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button className="button pull-right" onClick={toggleMoveMode}>
                        <i className="fa fa-arrows-alt" />
                        Edit pin location
                    </button>
                )}

                {!!pin.nextPinID && (
                    <ButtonContainer className="pull-right" to={`/company/pins/${pin.nextPinID}`}>
                        Next <i className="fa fa-arrow-right" />
                    </ButtonContainer>
                )}
                {!!pin.prevPinID && (
                    <ButtonContainer className="pull-right" to={`/company/pins/${pin.prevPinID}`}>
                        <i className="fa fa-arrow-left" />
                        Previous
                    </ButtonContainer>
                )}
            </BlockHeading>

            <Map
                center={[pin.location.latY, pin.location.lngX]}
                zoom={zoom}
                minZoom={0}
                maxZoom={6}
                onClick={handleClick}
                crs={CRS.Simple}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                    url={`${FILE_STORAGE_URL}/${drawing.tilesetS3Key}/{z}/{x}/{y}.jpg`}
                    noWrap={true}
                />
                <MapPin key={pin.id} pin={pin} pinHistory={pinHistory} />

                {moveMode && <Marker position={editPinLocationPosition} icon={newPinIcon} />}
            </Map>
            <p className="map-details">
                Last updated by: {`${user.createdByOperativeFullName} `}
                <DateTimeContainer date={pin.latestCreatedOn} />
            </p>
        </>
    );
};

export default SinglePinMap;
