import React from 'react';

import DrawingListItemContainer from '../containers/DrawingListItemContainer';

const DrawingList = ({ drawings, forwardRef, isSorting, headers, colSpanFirst = false }) => (
    <tbody ref={forwardRef} className={isSorting ? 'sorting' : ''}>
        {[...drawings]
            .sort((a, b) => a.sort - b.sort)
            .map((drawing, i) => (
                <DrawingListItemContainer
                    key={drawing.id}
                    drawing={drawing}
                    drawings={drawings}
                    index={i}
                    headers={headers}
                    colSpanFirst={colSpanFirst}
                />
            ))}
    </tbody>
);
export default DrawingList;
