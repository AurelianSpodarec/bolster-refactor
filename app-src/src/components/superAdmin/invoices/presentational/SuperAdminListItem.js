import React from 'react';
import { withRouter } from 'react-router-dom';

import { PAYMENT_TYPES, DATE_TIME_IDS, INVOICE_TYPES } from 'constants/companyAdmin/enums';
import { formatCurrency } from 'helpers/generic';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import LinkWithPropsContainer from 'components/shared/generic/button/containers/LinkWithPropsContainer.js';
import TooltipContainer from 'components/shared/generic/tooltip/containers/TooltipContainer';

const SuperAdminListItem = ({
    invoice: {
        createdOn,
        isPaid,
        subTotal,
        id,
        invoiceType,
        paymentType,
        companyID,
        isFree,
        isDeleted,
    },
    companies,
}) => (
    <tr className={isDeleted ? 'deleted-invoice' : ''}>
        <td style={{ display: 'flex' }}>
            {isDeleted && (
                <TooltipContainer
                    htmlText={'This invoice has been deleted'}
                    containerSide="tooltip-invoice"
                >
                    <i className="far fa-exclamation-triangle red-icon pull-right" />
                </TooltipContainer>
            )}
            <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>{companies[companyID].name}</td>
        <td>{id}</td>
        <td>{`£${formatCurrency(subTotal)}`}</td>
        <td>{INVOICE_TYPES[invoiceType] || isFree ? 'Free' : '-'}</td>
        <td>{PAYMENT_TYPES[paymentType] || '-'}</td>
        <td>{isFree ? 'Free' : isPaid ? 'Paid' : 'Awaiting Payment'}</td>
        <td>
            <BlockButtonWrapper>
                <LinkWithPropsContainer
                    to={{
                        pathname: `/admin/invoices/${companyID}/${id}`,
                        state: { fromCompany: false },
                    }}
                >
                    View
                </LinkWithPropsContainer>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(SuperAdminListItem);
