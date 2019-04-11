import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { CREDIT_LOG_TYPES } from 'constants/companyAdmin/enums';

const CreditLogsListItem = ({
    item: { createdOn, quantity, invoiceID, type }
}) => (
    <tr>
        <td>{moment(createdOn).format('DD/MM/YYYY hh:mm a')}</td>
        <td>{CREDIT_LOG_TYPES[type]}</td>
        <td>{quantity}</td>
        <td>{invoiceID}</td>
        <td>
            <Link className="button" to={`/company/invoices/${invoiceID}`}>
                View Invoice
            </Link>
        </td>
    </tr>
);

export default CreditLogsListItem;
