import React from 'react';

import FloorListItemContainer from '../containers/FloorListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const FloorList = ({ floors, colCount, forwardRef }) => (
    <tbody ref={forwardRef}>
        {[...floors]
            .sort((a, b) => a.sort - b.sort)
            .map((floor, i) => (
                <FloorListItemContainer
                    key={floor.id}
                    colCount={colCount}
                    floor={floor}
                    floors={floors}
                    index={i}
                />
            ))}
    </tbody>
);
export default withDropZone(FloorList, 'FLOOR');
