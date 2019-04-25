import React from 'react';
import { Link } from 'react-router-dom';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';
import { formatNumber } from 'helpers/generic';

const InvoiceListItem = ({ invoice }) => (
    <tr>
        <td>
            <DateTimeContainer date={invoice.createdOn} />
        </td>
        <td>£{formatNumber(invoice.total)}</td>
        <td>{PAYMENT_TYPES[invoice.paymentType]}</td>
        <td>{invoice.isPaid ? 'Paid' : 'Not paid'}</td>
        <td>
            <Link
                to={`/admin/invoices/${invoice.companyID}/${invoice.id}`}
                className="button"
            >
                View
            </Link>
        </td>
    </tr>
);

export default InvoiceListItem;
