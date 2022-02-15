import React from 'react';

import {
    ACTIVITY_LOG_REFERENCE_VALUES,
    ACTIVITY_LOG_ACTION_VALUES,
} from 'constants/companyAdmin/enums';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const ActivityLogItem = ({
    log: {
        actionReferenceName,
        actionReferenceType,
        actionType,
        actionTakenByString,
        actionTakenDate,
    },
}) => {
    return (
        <tr>
            <td>{actionReferenceName ? actionReferenceName : 'Unknown'}</td>
            <td>{ACTIVITY_LOG_REFERENCE_VALUES[actionReferenceType]}</td>
            <td>{ACTIVITY_LOG_ACTION_VALUES[actionType]}</td>
            <td>{actionTakenByString}</td>
            <td className="left-align">
                <DateTimeContainer date={actionTakenDate} />
            </td>
        </tr>
    );
};

export default ActivityLogItem;
