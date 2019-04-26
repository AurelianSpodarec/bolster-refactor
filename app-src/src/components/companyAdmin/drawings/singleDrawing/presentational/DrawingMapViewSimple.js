import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { FILE_STORAGE_URL } from 'config';
import L from 'leaflet';
import fileDownload from 'js-file-download';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CustomPin from 'components/shared/pins/map/presentational/CustomPin';
// import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import { RAW_S3_STORAGE_URL } from 'config';
import { EDIT_FLOOR_PLAN } from 'constants/shared/modalTypes';

const getDataUrl = src => `${FILE_STORAGE_URL}/${src}/{z}/{x}/{y}.jpg`;
const getFileName = src => src.match('[^/]*$')[0];

const DrawingMapViewSimple = ({
    position,
    addPinPosition,
    zoom,
    pins,
    handleClick,
    drawing = {},
    addMode,
    toggleAddMode,
    history,
    showModal
}) => {
    const newPinIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(
            <CustomPin pinColour="red" history={history} />
        ),
        iconSize: [24, 40],
        iconAnchor: [12, 40],
        popupAnchor: [0, -40]
    });

    return (
        <>
            {drawing.tilesetS3Key ? (
                <>
                    <BlockHeading>
                        {addMode ? (
                            <>
                                <Link
                                    to={`${drawing.id}/add-pin`}
                                    className="button green pull-right"
                                >
                                    <i className="fa fa-check" /> Confirm
                                    position
                                </Link>
                                <button
                                    className="button red pull-right"
                                    onClick={toggleAddMode}
                                >
                                    Stop
                                </button>
                            </>
                        ) : (
                            <button
                                className="button green pull-right"
                                onClick={toggleAddMode}
                            >
                                <i className="fa fa-plus" /> Add pin
                            </button>
                        )}

                        {!!drawing.tilesetS3KeyOrig && (
                            <>
                                {' '}
                                <button
                                    className="button"
                                    onClick={() =>
                                        fetch(
                                            `${RAW_S3_STORAGE_URL}/${
                                                drawing.tilesetS3KeyOrig
                                            }`
                                        ).then(res => {
                                            res.blob().then(blob =>
                                                fileDownload(
                                                    blob,
                                                    getFileName(
                                                        drawing.tilesetS3KeyOrig
                                                    )
                                                )
                                            );
                                        })
                                    }
                                >
                                    <i className="fa fa-download" /> Download
                                    Floor Plan
                                </button>
                                <button
                                    className="button yellow"
                                    onClick={() =>
                                        showModal(EDIT_FLOOR_PLAN, { drawing })
                                    }
                                >
                                    <i className="far fa-pencil fa-fw" /> Edit
                                    Floor Plan
                                </button>{' '}
                            </>
                        )}
                    </BlockHeading>
                    <Map
                        center={position}
                        zoom={zoom}
                        minZoom={0}
                        maxZoom={5}
                        onClick={e => handleClick(e)}

                        // Sets boundary to prevent scrolling into nothing, maxboundsviscosity prevents a snapback effect and disables scrolling out of bounds altogether
                        // maxBounds={[[-1000, -1000], [1000, 1000]]}
                        // maxBoundsViscosity={1}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                            url={getDataUrl(drawing.tilesetS3Key)}
                            noWrap={true}
                        />
                        {pins.map(pin => (
                            <MapPin key={pin.id} pin={pin} />
                        ))}
                        {addMode && (
                            <Marker
                                position={addPinPosition}
                                icon={newPinIcon}
                            />
                        )}
                    </Map>
                </>
            ) : (
                <Loading message="Please wait for your tileset to load" />
            )}
        </>
    );
};

export default DrawingMapViewSimple;
