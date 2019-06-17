import React from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

import Block from 'components/shared/generic/block/presentational/Block';
import { FILE_STORAGE_URL } from 'config';
import RedX from 'components/shared/pins/map/presentational/RedX';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PinSelectorOptions from 'components/shared/pinSelector/presentational/PinSelectorOptions';
import Rectangle from 'components/shared/pinSelector/presentational/Rectangle';
import MapPinContainer from 'components/shared/pins/map/containers/MapPinContainer';

const FilterMap = ({
    drawing,
    pins,
    handleClick,
    cornerClicked,
    rectangles,
    handleDelete,
    setMode,
    shouldShowMapOptions,
    mode,
    handleCancelPinSelector,
    isExcluding
}) => {
    // TODO change icon
    const cornerClickedIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(<RedX />),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50]
    });
    return (
        <Block>
            {shouldShowMapOptions && (
                <BlockHeading>
                    <PinSelectorOptions
                        setMode={setMode}
                        mode={mode}
                        handleCancel={handleCancelPinSelector}
                    />
                </BlockHeading>
            )}
            <Map
                center={[51.505, -0.09]}
                zoom={3}
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
                {cornerClicked && (
                    <Marker position={cornerClicked} icon={cornerClickedIcon} />
                )}
                {rectangles.map(rectangle => (
                    <Rectangle
                        key={rectangle.id}
                        rectangle={rectangle}
                        onClick={() => handleDelete(rectangle.id)}
                    />
                ))}
                {pins.map(pin => (
                    <MapPinContainer
                        key={pin.id}
                        pin={pin}
                        isExcluding={isExcluding}
                    />
                ))}
            </Map>
        </Block>
    );
};

export default FilterMap;
