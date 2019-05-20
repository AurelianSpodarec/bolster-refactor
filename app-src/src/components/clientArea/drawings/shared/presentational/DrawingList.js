import React from 'react';

import DrawingListItemContainer from '../containers/DrawingListItemContainer';

const DrawingList = ({ drawings }) =>
    drawings.map(drawing => (
        <DrawingListItemContainer key={drawing.id} drawing={drawing} />
    ));
export default DrawingList;
