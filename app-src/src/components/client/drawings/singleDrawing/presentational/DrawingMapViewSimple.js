import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { FILE_STORAGE_URL } from 'config';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
// import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import MapPinContainer from 'components/shared/pins/map/containers/MapPinContainer';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const getDataUrl = src => `${FILE_STORAGE_URL}/${src}/{z}/{x}/{y}.jpg`;

const DrawingMapViewSimple = ({
    position,
    zoom,
    pins,
    drawing = {},
    updating
}) => {
    return (
        <>
            {drawing.tilesetS3Key ? (
                <>
                    <BlockHeading>
                        {updating && (
                            <p>
                                Updating floorplan... <LoadingIcon />
                            </p>
                        )}
                    </BlockHeading>
                    <Map
                        center={position}
                        zoom={zoom}
                        minZoom={0}
                        maxZoom={5}

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
                            <MapPinContainer
                                urlStart="client"
                                key={pin.id}
                                pin={pin}
                                isReport={true}
                                withTooltip={true}
                            />
                        ))}
                    </Map>
                </>
            ) : (
                <Loading message="Please wait for your tileset to load" />
            )}
        </>
    );
};

export default DrawingMapViewSimple;
