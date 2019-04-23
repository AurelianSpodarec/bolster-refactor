import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { FILE_STORAGE_URL } from 'config';
import L from 'leaflet';

import MapPin from 'components/shared/pins/map/presentational/MapPin';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CustomPin from 'components/shared/pins/map/presentational/CustomPin';

const DrawingMapViewSimple = ({
    position,
    addPinPosition,
    zoom,
    pins,
    handleClick,
    drawing = {},
    addMode,
    toggleAddMode,
    history
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
                    {addMode ? (
                        <BlockHeading>
                            <Link
                                to={`${drawing.id}/add-pin`}
                                className="button green pull-right"
                            >
                                <i className="fa fa-check" /> Confirm position
                            </Link>
                            <button
                                className="button red pull-right"
                                onClick={toggleAddMode}
                            >
                                Stop
                            </button>
                        </BlockHeading>
                    ) : (
                        <BlockHeading>
                            <button
                                className="button green pull-right"
                                onClick={toggleAddMode}
                            >
                                <i className="fa fa-plus" /> Add pin
                            </button>
                        </BlockHeading>
                    )}

                    <Map
                        center={position}
                        zoom={zoom}
                        minZoom={0}
                        maxZoom={5}
                        onClick={e => handleClick(e)}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                            url={`${FILE_STORAGE_URL}/${
                                drawing.tilesetS3Key
                            }/{z}/{x}/{y}.jpg`}
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
                <p className="no-data centered">
                    Please wait for your tileset to load
                </p>
            )}
        </>
    );
};

export default DrawingMapViewSimple;
