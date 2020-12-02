import React from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';
import { CRS } from 'leaflet';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { FILE_STORAGE_URL } from 'config';
import moment from 'moment';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
// import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import MapPinContainer from 'components/shared/pins/map/containers/MapPinContainer';
import RedX from 'components/shared/pins/map/presentational/RedX';
import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';
import PinSelectorOptions from 'components/shared/pinSelector/presentational/PinSelectorOptions';
import Rectangle from 'components/shared/pinSelector/presentational/Rectangle';

const getDataUrl = src => `${FILE_STORAGE_URL}/${src}/{z}/{x}/{y}.jpg`;

const DrawingMapViewSimple = ({
    position,
    zoom,
    pins,
    drawing = {},
    updating,
    handleClick,
    cornerClicked,
    shouldShowPinSelectorOptions,
    setMode,
    rectangles,
    handleDelete,
    mode,
    handleCancelPinSelector,
    updateCurTooltip,
    isExcluding,
    currentTooltip,
    drawingNotStarted,
}) => {
    const cornerClickedIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(<RedX />),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50],
    });

    return drawing.tilesetS3Key ? (
        <>
            <BlockHeading>
                {drawingNotStarted && (
                    <p className="info-message error" style={{ marginBottom: '15px' }}>
                        This drawing has not yet started, and as such has restricted functionality.
                        This drawing is due to start on{' '}
                        {moment(drawing.startDate).format('dddd, MMMM Do YYYY, h:mm:ss a')}. You may
                        bring this date forward by editing the drawing.
                    </p>
                )}
                {updating && (
                    <p>
                        Uploading Drawing... <LoadingIcon />
                    </p>
                )}
                {shouldShowPinSelectorOptions && (
                    <PinSelectorOptions
                        setMode={setMode}
                        mode={mode}
                        handleCancel={handleCancelPinSelector}
                    />
                )}
            </BlockHeading>
            <Map
                center={position}
                zoom={zoom}
                minZoom={0}
                maxZoom={6}
                onClick={handleClick}
                crs={CRS.Simple}
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                    url={getDataUrl(drawing.tilesetS3Key)}
                    noWrap={true}
                />
                {pins.map(pin => (
                    <MapPinContainer
                        updateCurTooltip={updateCurTooltip}
                        urlStart="client"
                        key={pin.id}
                        pin={pin}
                        withLink={!shouldShowPinSelectorOptions}
                        withTooltip={!isExcluding}
                        isExcluding={isExcluding}
                        tooltipVisible={currentTooltip === pin.id}
                        isClient
                        client
                    />
                ))}

                {cornerClicked && <Marker position={cornerClicked} icon={cornerClickedIcon} />}
                {rectangles.map(rectangle => (
                    <Rectangle
                        key={rectangle.id}
                        rectangle={rectangle}
                        onClick={() => handleDelete(rectangle.id)}
                    />
                ))}
            </Map>
        </>
    ) : (
        <Loading message="Please wait for your tileset to load" />
    );
};

export default DrawingMapViewSimple;
