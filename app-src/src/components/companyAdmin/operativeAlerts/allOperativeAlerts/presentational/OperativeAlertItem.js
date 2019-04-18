import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const OperativeAlertItem = ({
    alert: { createdByUserFirstName, createdByUserLastName, createdOn, message }
}) => (
    <tr>
        <td>{`${createdByUserFirstName} ${createdByUserLastName}`}</td>
        <td>{message}</td>
        <td>
            <DateTimeContainer date={createdOn} />
        </td>
        <td>##100%##</td>
        <td>##60%##</td>
        <td>##40%##</td>
        <td>
            <button className="button">##Show Metrics##</button>
        </td>
    </tr>
);

export default OperativeAlertItem;
