import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const OperativeAlertItem = ({
    alert: {
        createdByUserFirstName,
        createdByUserLastName,
        createdOn,
        message,
        sentCount,
        deliveredCount,
        readCount,
        id
    }
}) => (
    <tr>
        <td>{`${createdByUserFirstName} ${createdByUserLastName}`}</td>
        <td>{message}</td>
        <td>
            <DateTimeContainer date={createdOn} />
        </td>
        <td>{sentCount}</td>
        <td>{(deliveredCount / sentCount) * 100}%</td>
        <td>{(readCount / sentCount) * 100}%</td>
        <td>
            <ButtonContainer
                to={`/company/tools/operative-alerts/${id}/metrics`}
            >
                ##Show Metrics##
            </ButtonContainer>
        </td>
    </tr>
);

export default OperativeAlertItem;
