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
}) =>
    drawing.tilesetS3Key ? (
        <>
            <BlockHeading>
                {updating && (
                    <p>
                        Uploading Drawing... <LoadingIcon />
                    </p>
                )}
            </BlockHeading>
            <Map center={position} zoom={zoom} minZoom={0} maxZoom={5}>
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
                        withLink={true}
                        withTooltip={true}
                    />
                ))}
            </Map>
        </>
    ) : (
        <Loading message="Please wait for your tileset to load" />
    );

export default DrawingMapViewSimple;
