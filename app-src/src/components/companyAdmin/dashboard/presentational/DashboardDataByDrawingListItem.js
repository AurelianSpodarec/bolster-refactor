import React from 'react';

const DrawingDataByDrawingListItem = ({ drawing }) => (
    <tr>
        <td>{drawing.name}</td>
        <td>{drawing.pinsUpdated}</td>
        <td />
    </tr>
);

export default DrawingDataByDrawingListItem;
