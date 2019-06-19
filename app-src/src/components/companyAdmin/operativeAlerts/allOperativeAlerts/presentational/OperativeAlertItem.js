import React from 'react';

import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';
import { roundToTwoPlacesMax } from 'helpers/generic';

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
        <td>{roundToTwoPlacesMax((deliveredCount / sentCount) * 100)}%</td>
        <td>{roundToTwoPlacesMax((readCount / sentCount) * 100)}%</td>
        <td>
            <ButtonContainer
                to={`/company/message-centre/operative-alerts/${id}/metrics`}
            >
                Show Metrics
            </ButtonContainer>
        </td>
    </tr>
);

export default OperativeAlertItem;
