import React from 'react';

import FloorListItemContainer from '../containers/FloorListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const FloorList = ({ floors, colCount, forwardRef, isSorting, headers, colSpanFirst }) => (
    <tbody ref={forwardRef} className={isSorting ? 'sorting' : ''}>
        {[...floors]
            .sort((a, b) => a.sort - b.sort)
            .map((floor, i) => (
                <FloorListItemContainer
                    key={floor.id}
                    colCount={colCount}
                    floor={floor}
                    floors={floors}
                    index={i}
                    headers={headers}
                    colSpanFirst={colSpanFirst}
                />
            ))}
    </tbody>
);
export default withDropZone(FloorList, 'FLOOR');
