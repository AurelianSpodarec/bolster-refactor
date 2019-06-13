import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import withDrag from 'components/shared/dragDrop/hocs/withDrag';

const DrawingListItem = ({ drawing, permissions, forwardRef, isDragging }) => (
    <tr
        ref={forwardRef}
        style={{ opacity: isDragging ? 0 : 1 }}
        className="draggable"
    >
        <td>{drawing.name}</td>
        <td>
            <DateTimeContainer date={drawing.pinsLastUpdatedOn} />
        </td>
        <td>
            <DateTimeContainer date={drawing.expiresOn} />
        </td>
        <td>{permissions}</td>
        <td>
            <ButtonContainer to={`/company/drawings/${drawing.id}`}>
                View
            </ButtonContainer>
        </td>
    </tr>
);

export default withDrag(DrawingListItem, 'DRAWING');
