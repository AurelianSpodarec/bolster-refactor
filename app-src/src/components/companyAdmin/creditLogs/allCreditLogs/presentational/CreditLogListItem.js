import React from 'react';
import { Link } from 'react-router-dom';

import { CREDIT_LOG_TYPES } from 'constants/companyAdmin/enums';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';

const CreditLogsListItem = ({
    item: { createdOn, quantity, invoiceID, type, drawingID }
}) => (
    <tr>
        <td>
            <DateTimeContainer date={createdOn} />
        </td>
        <td>{CREDIT_LOG_TYPES[type]}</td>
        <td>{quantity}</td>
        <td>
            {invoiceID ? (
                <Link className="button" to={`/company/invoices/${invoiceID}`}>
                    View Invoice
                </Link>
            ) : (
                <Link className="button" to={`/company/drawings/${drawingID}`}>
                    View Drawing
                </Link>
            )}
        </td>
    </tr>
);

export default CreditLogsListItem;
