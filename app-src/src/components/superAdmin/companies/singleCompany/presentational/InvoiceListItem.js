import React from 'react';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';
import { formatNumber } from 'helpers/generic';
import LinkWithPropsContainer from 'components/shared/generic/button/containers/LinkWithPropsContainer';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const InvoiceListItem = ({ invoice }) => (
    <tr className={invoice.isDeleted ? 'deleted-invoice' : ''}>
        <td style={{ display: 'flex' }}>
            {invoice.isDeleted && (
                <TooltipContainer
                    htmlText={'This invoice has been deleted'}
                    containerSide="tooltip-invoice"
                >
                    <i className="far fa-exclamation-triangle red-icon pull-right" />
                </TooltipContainer>
            )}
            <DateTimeContainer date={invoice.createdOn} />
        </td>
        <td>£{formatNumber(invoice.total)}</td>
        <td>{PAYMENT_TYPES[invoice.paymentType]}</td>
        <td>{invoice.isPaid ? 'Paid' : 'Not paid'}</td>
        <td>
            <LinkWithPropsContainer
                to={{
                    pathname: `/admin/invoices/${invoice.companyID}/${invoice.id}`,
                    state: { fromCompany: true },
                }}
                className="button"
            >
                View
            </LinkWithPropsContainer>
        </td>
    </tr>
);

export default InvoiceListItem;
