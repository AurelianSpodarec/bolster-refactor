import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';

const InvoiceListItem = ({ invoice }) => (
    <tr>
        <td>
            <DateTimeContainer date={invoice.createdOn} />
        </td>
        <td>£{invoice.total}</td>
        <td>{PAYMENT_TYPES[invoice.paymentType]}</td>
        <td>{invoice.isPaid ? 'Paid' : 'Not paid'}</td>
        <td />
    </tr>
);

export default InvoiceListItem;
