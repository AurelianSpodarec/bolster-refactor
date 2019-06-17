import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import { FILE_STORAGE_URL } from 'config';
import L from 'leaflet';
// import fileDownload from 'js-file-download';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CustomPin from 'components/shared/pins/map/presentational/CustomPin';
import Loading from 'components/shared/generic/misc/presentational/Loading';
// import { RAW_S3_STORAGE_URL } from 'config';
import { EDIT_DRAWING } from 'constants/shared/modalTypes';
import MapPinContainer from 'components/shared/pins/map/containers/MapPinContainer';
import RedX from 'components/shared/pins/map/presentational/RedX';
import PinSelectorOptions from 'components/shared/pinSelector/presentational/PinSelectorOptions';
import Rectangle from 'components/shared/pinSelector/presentational/Rectangle';
// import LoadingIcon from 'components/shared/generic/misc/presentational/LoadingIcon';

const getDataUrl = src => `${FILE_STORAGE_URL}/${src}/{z}/{x}/{y}.jpg`;
// const getFileName = src => src.match('[^/]*$')[0];

const DrawingMapViewSimple = ({
    position,
    addPinPosition,
    zoom,
    pins,
    handleClick,
    handleClearPinCache,
    drawing = {},
    addMode,
    toggleAddMode,
    history,
    showModal,
    updating,
    updateMessage,
    shouldShowPinSelectorOptions,
    setMode,
    cornerClicked,
    rectangles,
    handleDelete,
    mode,
    handleCancelPinSelector
}) => {
    const newPinIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(
            <CustomPin pinColour="red" history={history} />
        ),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50]
    });

    const cornerClickedIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(<RedX />),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50]
    });

    return (
        <>
            {drawing.tilesetS3Key && !updating ? (
                <>
                    <BlockHeading>
                        {shouldShowPinSelectorOptions ? (
                            <PinSelectorOptions
                                setMode={setMode}
                                mode={mode}
                                handleCancel={handleCancelPinSelector}
                            />
                        ) : (
                            <>
                                {addMode ? (
                                    <>
                                        <Link
                                            onClick={handleClearPinCache}
                                            to={`${drawing.id}/add-pin`}
                                            className="button green pull-right"
                                        >
                                            <i className="fa fa-check" />{' '}
                                            Confirm position
                                        </Link>
                                        <button
                                            className="button red pull-right"
                                            onClick={toggleAddMode}
                                        >
                                            Cancel
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
                                <button
                                    className="button yellow"
                                    onClick={() =>
                                        showModal(EDIT_DRAWING, { drawing })
                                    }
                                >
                                    <i className="far fa-pencil fa-fw" /> Edit
                                    drawing
                                </button>
                            </>
                        )}
                    </BlockHeading>
                    <Map
                        center={position}
                        zoom={zoom}
                        minZoom={0}
                        maxZoom={5}
                        onClick={e => handleClick(e)}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                            url={getDataUrl(drawing.tilesetS3Key)}
                            noWrap={true}
                        />
                        {pins.map(pin => (
                            <MapPinContainer
                                urlStart="company"
                                key={pin.id}
                                pin={pin}
                                withLink={!shouldShowPinSelectorOptions}
                                withTooltip={true}
                            />
                        ))}
                        {addMode && (
                            <Marker
                                position={addPinPosition}
                                icon={newPinIcon}
                            />
                        )}
                        {cornerClicked && (
                            <Marker
                                position={cornerClicked}
                                icon={cornerClickedIcon}
                            />
                        )}
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
                <Loading
                    message={
                        updating
                            ? updateMessage
                            : 'Please wait for your tileset to load'
                    }
                />
            )}
        </>
    );
};

export default DrawingMapViewSimple;
