import React from 'react';

import CheckboxContainer from 'components/shared/generic/form/containers/CheckboxContainer';

const UserDrawingListItem = ({
    drawing,
    checkedDrawings,
    handleDrawingIDs
}) => (
    <tr key={drawing.id}>
        <td>{`${drawing.name}`}</td>
        <td>
            <input
                name="drawingIDs"
                checked={checkedDrawings.includes(String(drawing.id))}
                onChange={e => handleDrawingIDs(e)}
                type="checkbox"
                value={drawing.id}
            />
        </td>
    </tr>
);

export default UserDrawingListItem;
