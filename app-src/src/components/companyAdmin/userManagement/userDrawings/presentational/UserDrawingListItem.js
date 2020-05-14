import React from 'react';

const UserDrawingListItem = ({
    drawing,
    checkedDrawings,
    handleDrawingIDs,
    siteName,
    buildingName,
    floorName,
    serviceNames,
}) => (
        <tr key={drawing.id}>
            <td>{`${siteName} / ${buildingName} / ${floorName} / ${
                drawing.name
                } ${serviceNames ? `(${serviceNames})` : ''}`}
            </td>
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
