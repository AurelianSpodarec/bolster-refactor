import React from 'react';
import moment from 'moment';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';

const InvoiceListItem = ({ invoice }) => (
    <tr>
        <td>{moment(invoice.createdOn).format('DD/MM/YYYY')}</td>
        <td>{invoice.id}</td>
        <td>{`£${invoice.total}`}</td>
        <td>{PAYMENT_TYPES[invoice.paymentType]}</td>
        <td>{invoice.isPaid ? 'Paid' : 'Awaiting Payment'}</td>
        <td>{!invoice.isPaid && <i className="fa fa-exclamation" />}</td>
        <td>
            <BlockButtonWrapper>
                <button className="button">View</button>
                {!invoice.isPaid && <button className="button">Pay</button>}
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default InvoiceListItem;
