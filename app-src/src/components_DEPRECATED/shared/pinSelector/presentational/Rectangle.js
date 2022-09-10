import React from 'react';
import { Rectangle as LeafletRectangle } from 'react-leaflet';
import defaultStyles from 'constants/defaultStyles';

const Rectangle = ({ rectangle, onClick }) => (
    <LeafletRectangle
        key={rectangle.id}
        bounds={rectangle.corners}
        onClick={onClick}
        color={defaultStyles.colourCode}
        style={{ color: defaultStyles.colourCode }}
    />
);

export default Rectangle;
