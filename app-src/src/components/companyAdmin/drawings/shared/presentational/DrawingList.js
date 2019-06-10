import React from 'react';

import DrawingListItemContainer from '../containers/DrawingListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const DrawingList = ({ drawings, forwardRef, isOver }) => (
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {[...drawings]
            .sort((a, b) => a.sort - b.sort)
            .map((drawing, i) => (
                <DrawingListItemContainer
                    key={drawing.id}
                    drawing={drawing}
                    drawings={drawings}
                    index={i}
                />
            ))}
    </tbody>
);
export default withDropZone(DrawingList, 'DRAWING');
