import React from 'react';

import FloorListItemContainer from '../containers/FloorListItemContainer';

const FloorList = ({ floors }) =>
    floors.map(floor => (
        <FloorListItemContainer key={floor.id} floor={floor} />
    ));
export default FloorList;
