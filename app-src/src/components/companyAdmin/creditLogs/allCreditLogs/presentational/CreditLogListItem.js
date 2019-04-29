import React from 'react';

import { CREDIT_LOG_TYPES } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';

const CreditLogsListItem = ({
    item: {
        createdOn,
        quantity,
        invoiceID,
        type,
        drawingID,
        siteName,
        buildingName,
        floorName,
        drawingName
    }
}) => {
    const drawingDetails = drawingID
        ? `${siteName} / ${buildingName} / ${floorName} / ${drawingName}`
        : 'N/A';
    return (
        <tr>
            <td>
                <DateTimeContainer date={createdOn} />
            </td>
            <td>{CREDIT_LOG_TYPES[type]}</td>
            <td>{quantity}</td>
            <td>{drawingDetails}</td>
            <td>
                {invoiceID ? (
                    <ButtonNoClickContainer
                        to={`/company/invoices/${invoiceID}`}
                    >
                        View Invoice
                    </ButtonNoClickContainer>
                ) : (
                    <ButtonNoClickContainer
                        to={`/company/drawings/${drawingID}`}
                    >
                        View Drawing
                    </ButtonNoClickContainer>
                )}
            </td>
        </tr>
    );
};

export default CreditLogsListItem;
