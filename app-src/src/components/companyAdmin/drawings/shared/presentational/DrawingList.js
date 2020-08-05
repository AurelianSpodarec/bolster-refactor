import React from 'react';

import DrawingListItemContainer from '../containers/DrawingListItemContainer';

const DrawingList = ({ drawings, forwardRef, isOver, headers }) => (
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {[...drawings]
            .sort((a, b) => a.sort - b.sort)
            .map((drawing, i) => (
                <DrawingListItemContainer
                    key={drawing.id}
                    drawing={drawing}
                    drawings={drawings}
                    index={i}
                    headers={headers}
                />
            ))}
    </tbody>
);
export default DrawingList;
