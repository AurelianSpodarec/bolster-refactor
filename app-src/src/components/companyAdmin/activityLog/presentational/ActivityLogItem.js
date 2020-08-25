import React from 'react';
import moment from 'moment';

import {
    ACTIVITY_LOG_REFERENCE_VALUES,
    ACTIVITY_LOG_ACTION_VALUES,
} from 'constants/companyAdmin/enums';

const ActivityLogItem = ({
    log: {
        actionReferenceName,
        actionReferenceType,
        actionType,
        actionTakenByCompanyUserID,
        actionTakenByString,
        actionTakenDate,
    },
    users,
}) => {
    const user = users[actionTakenByCompanyUserID];

    return (
        <tr>
            <td>{actionReferenceName ? actionReferenceName : 'Unknown'}</td>
            <td>{ACTIVITY_LOG_REFERENCE_VALUES[actionReferenceType]}</td>
            <td>{ACTIVITY_LOG_ACTION_VALUES[actionType]}</td>
            <td>
                {actionTakenByCompanyUserID && user
                    ? `${user.userFirstName} ${user.userLastName}`
                    : actionTakenByString}
            </td>
            <td className="left-align">{moment(actionTakenDate).format('DD/MM/YYYY HH:mm')}</td>
        </tr>
    );
};

export default ActivityLogItem;
