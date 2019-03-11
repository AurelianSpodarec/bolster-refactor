import React from 'react';

import DrawingListItem from './DrawingListItem';

const DrawingList = ({ drawings }) =>
    drawings.map(drawing => (
        <DrawingListItem key={drawing.id} drawing={drawing} />
    ));
export default DrawingList;
