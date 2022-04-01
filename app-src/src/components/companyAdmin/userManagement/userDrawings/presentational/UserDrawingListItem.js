import moment from 'moment';
import React from 'react';
import ExpiredDateText from './ExpiredDateText';

const UserDrawingListItem = ({
    drawing,
    checkedDrawings,
    handleDrawingIDs,
    siteName,
    buildingName,
    floorName,
    serviceNames,
}) => {
    const isExpired = moment(drawing.expiresOn).isBefore(moment.now());

    return (
        <tr key={drawing.id} className="drawing-access-item">
            <td>
                <a href={`/company/drawings/${drawing.id}`}>
                    {`${siteName} / ${buildingName} / ${floorName} / ${drawing.name} ${
                        serviceNames ? `(${serviceNames})` : ''
                    } - `}
                </a>{' '}
                <ExpiredDateText expiresOn={drawing.expiresOn} isExpired={isExpired} />
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
};

export default UserDrawingListItem;
