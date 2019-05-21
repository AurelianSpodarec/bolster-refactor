import React from 'react';

import FloorListItemContainer from '../containers/FloorListItemContainer';

const FloorList = ({ floors, colCount }) =>
    floors.map(floor => (
        <FloorListItemContainer
            key={floor.id}
            colCount={colCount}
            floor={floor}
        />
    ));
export default FloorList;
