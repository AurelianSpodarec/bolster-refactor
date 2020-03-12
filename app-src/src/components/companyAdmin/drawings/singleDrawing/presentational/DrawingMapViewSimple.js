import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';

import ReactDOMServer from 'react-dom/server';
import { FILE_STORAGE_URL } from 'config';
import L from 'leaflet';
import { CRS } from 'leaflet';

import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import CustomPin from 'components/shared/pins/map/presentational/CustomPin';
import Loading from 'components/shared/generic/misc/presentational/Loading';
import {
    ACCESS_TYPES_VALUES,
    FLOORPLAN_STATES
} from 'constants/companyAdmin/enums';
import { EDIT_DRAWING } from 'constants/shared/modalTypes';
import MapPinContainer from 'components/shared/pins/map/containers/MapPinContainer';
import RedX from 'components/shared/pins/map/presentational/RedX';
import PinSelectorOptions from 'components/shared/pinSelector/presentational/PinSelectorOptions';
import Rectangle from 'components/shared/pinSelector/presentational/Rectangle';
import AddCreditsToDrawingButtonContainer from '../../addCreditsToDrawing/containers/AddCreditsToDrawingButtonContainer';
import DrawingMapAddZone from './DrawingMapAddZone';
import DrawingMapViewZones from './DrawingMapViewZones';

const getDataUrl = src => `${FILE_STORAGE_URL}/${src}/{z}/{x}/{y}.jpg`;

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
    shouldShowPinSelectorOptions,
    setMode,
    cornerClicked,
    rectangles,
    handleDelete,
    mode,
    handleCancelPinSelector,
    isExcluding,
    updateCurTooltip,
    currentTooltip,
    isExpired,
    isAddingZone,
    handleZoneAdd,
    cancelZoneAdd,
    toggleZones,
    showZones,
    zonesOpacity,
    handleOpacityChange,
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
    const shouldShowFloorplan = !!drawing.tilesetS3Key && !updating;

    return (
        <>
            {shouldShowFloorplan ? (
                <div className="size-lg-12" id="map">
                    <BlockHeading>
                        {isAddingZone ? (
                            <></>
                        ) : shouldShowPinSelectorOptions ? (
                            <PinSelectorOptions
                                setMode={setMode}
                                mode={mode}
                                handleCancel={handleCancelPinSelector}
                            />
                        ) : isExpired ? (
                            drawing.accessType ===
                            ACCESS_TYPES_VALUES.OWNER && (
                                <>
                                    <AddCreditsToDrawingButtonContainer
                                        drawing={drawing}
                                    />
                                    <button
                                        onClick={() => { }}
                                        className="button red pull-right"
                                    >
                                        <i className="far fa-times" /> Drawing
                                        expired
                                    </button>
                                </>
                            )
                        ) : (
                                        drawing.accessType >= ACCESS_TYPES_VALUES.WRITE && (
                                            <>
                                                {addMode ? (
                                                    <>
                                                        <button
                                                            onClick={handleClearPinCache}
                                                            to={`${drawing.id}/add-pin`}
                                                            className="button green pull-right"
                                                        >
                                                            <i className="fa fa-check" />{' '}
                                                Confirm position
                                            </button>
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
                                                {drawing.accessType ===
                                                    ACCESS_TYPES_VALUES.OWNER && (
                                                        <>
                                                            <button
                                                                className="button yellow"
                                                                onClick={() =>
                                                                    showModal(EDIT_DRAWING, {
                                                                        drawing
                                                                    })
                                                                }
                                                            >
                                                                <i className="far fa-pencil fa-fw" />{' '}
                                                Edit drawing
                                            </button>

                                                            <AddCreditsToDrawingButtonContainer
                                                                drawing={drawing}
                                                            />
                                                        </>
                                                    )}
                                            </>
                                        )
                                    )}
                    </BlockHeading>
                    <Map
                        center={position}
                        zoom={zoom}
                        minZoom={0}
                        maxZoom={8}
                        onClick={e => handleClick(e)}
                        crs={CRS.Simple}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://app.bolstersystems.com">Bolster Systems Ltd</a>'
                            url={getDataUrl(drawing.tilesetS3Key)}
                            noWrap={true}
                            maxNativeZoom={6}
                        />

                        {isAddingZone ? (
                            <DrawingMapAddZone />
                        ) : (
                                <>
                                    {showZones && <DrawingMapViewZones />}
                                    {pins.map(pin => (
                                        <MapPinContainer
                                            updateCurTooltip={updateCurTooltip}
                                            tooltipVisible={
                                                currentTooltip === pin.id
                                            }
                                            urlStart="company"
                                            key={pin.id}
                                            pin={pin}
                                            withLink={
                                                !shouldShowPinSelectorOptions &&
                                                !addMode
                                            }
                                            withTooltip={!isExcluding}
                                            isExcluding={isExcluding}
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
                                            onClick={() =>
                                                handleDelete(rectangle.id)
                                            }
                                        />
                                    ))}
                                </>
                            )}
                    </Map>

                    {!shouldShowPinSelectorOptions &&
                        !isExpired &&
                        !addMode &&
                        drawing.accessType >= ACCESS_TYPES_VALUES.WRITE && (
                            <div className="map-bottom-buttons">
                                {isAddingZone ? (
                                    <>
                                        <button
                                            className="button green disabled"
                                            disabled
                                        >
                                            <i className="far fa-check fa-fw" />{' '}
                                            Finish
                                        </button>
                                        <button
                                            className="button grey"
                                            onClick={cancelZoneAdd}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                        <>
                                            <button
                                                className="button blue"
                                                onClick={handleZoneAdd}
                                            >
                                                View Zones
                                        </button>
                                            <button
                                                className="button blue"
                                                onClick={toggleZones}
                                            >
                                                Toggle zones on/off
                                        </button>
                                            {showZones && <div className="map-opacity pull-right">
                                                <p>Opacity</p>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="1"
                                                    value={zonesOpacity}
                                                    step="0.1"
                                                    onChange={e => handleOpacityChange(e.target.value)}
                                                />
                                            </div>}
                                        </>
                                    )}
                            </div>
                        )}
                </div>
            ) : drawing.latestFloorplanState ===
                FLOORPLAN_STATES.FAILEDCANCELLED ? (
                        <button
                            className="button yellow"
                            onClick={() => showModal(EDIT_DRAWING, { drawing })}
                        >
                            <i className="far fa-pencil fa-fw" /> Upload failed - retry?
                        </button>
                    ) : (
                        <Loading
                            message="Floorplan is generating, please check back later."
                            withIcon={false}
                        />
                    )}
        </>
    );
};

export default DrawingMapViewSimple;
