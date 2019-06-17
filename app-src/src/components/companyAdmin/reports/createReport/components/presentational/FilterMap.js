import React from 'react';
import { Map, TileLayer, Marker, Rectangle } from 'react-leaflet';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

import Block from 'components/shared/generic/block/presentational/Block';
import CustomPin from 'components/shared/pins/map/presentational/CustomPin';
import { FILE_STORAGE_URL } from 'config';
import MapPin from 'components/shared/pins/map/presentational/MapPin';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { RECTANGLE_MODES } from 'constants/companyAdmin/enums';
const { ADD, DELETE, NONE } = RECTANGLE_MODES;

const FilterMap = ({
    drawing,
    pins,
    handleClick,
    cornerClicked,
    rectangles,
    handleDelete,
    setMode
}) => {
    // TODO change icon
    const cornerClickedIcon = L.divIcon({
        className: '',
        html: ReactDOMServer.renderToString(<CustomPin pinColour="red" />),
        iconSize: [30, 50],
        iconAnchor: [15, 50],
        popupAnchor: [0, -50]
    });
    return (
        <Block>
            <BlockButtonWrapper>
                <ButtonContainer handleClick={() => setMode(ADD)}>
                    Add Mode
                </ButtonContainer>
                <ButtonContainer handleClick={() => setMode(DELETE)}>
                    Delete Mode
                </ButtonContainer>
                <ButtonContainer handleClick={() => setMode(NONE)}>
                    Cancel
                </ButtonContainer>
            </BlockButtonWrapper>
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
                        bounds={rectangle.corners}
                        onClick={() => handleDelete(rectangle.id)}
                    />
                ))}
                {pins.map(pin => (
                    <MapPin key={pin.id} pin={pin} />
                ))}
            </Map>
        </Block>
    );
};

export default FilterMap;
