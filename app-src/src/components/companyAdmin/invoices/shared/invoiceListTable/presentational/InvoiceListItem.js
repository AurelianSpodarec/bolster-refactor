import React from 'react';
import { withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PAYMENT_TYPES, DATE_TIME_IDS, INVOICE_TYPES } from 'constants/companyAdmin/enums';
import { PAY_INVOICE } from 'constants/shared/modalTypes';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import LinkWithPropsContainer from 'components/shared/generic/button/containers/LinkWithPropsContainer';

const InvoiceListItem = ({
    invoice: {
        createdOn,
        isPaid,
        isFree,
        subTotal,
        total,
        id,
        invoiceType,
        paymentType,
        userFirstName,
        userLastName,
        remainingToPay,
    },
    showModal,
    onMobile,
    headers,
    location,
}) => (
    <tr>
        <td>
            {onMobile && <span className="mobile-table-heading">{headers[0]}</span>}
            <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATETIME} />
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[1]}</span>}
            {id}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[2]}</span>}
            {`£${formatCurrency(subTotal)}`}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[3]}</span>}
            {`£${formatCurrency(total)}`}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[4]}</span>}
            {`£${
                remainingToPay && remainingToPay > 0 && !isPaid ? formatCurrency(remainingToPay) : 0
            }`}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[5]}</span>}
            {invoiceType > 0 ? INVOICE_TYPES[invoiceType] : isFree ? 'Free' : '-'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[6]}</span>}
            {PAYMENT_TYPES[paymentType] || '-'}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[7]}</span>}
            {isFree ? 'Free' : isPaid ? 'Paid' : 'Awaiting Payment'}{' '}
            {onMobile && (
                <StatusIcon classes="warning" iconClass="fa fa-exclamation-triangle far" />
            )}
        </td>
        {!onMobile && (
            <td>
                {!isPaid && (
                    <StatusIcon classes="warning" iconClass="fa fa-exclamation-triangle far" />
                )}
            </td>
        )}

        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[9]}</span>}
            {`${userFirstName} ${userLastName}`}
        </td>
        <td>
            {' '}
            {onMobile && <span className="mobile-table-heading">{headers[10]}</span>}
            <BlockButtonWrapper>
                {!isPaid && (
                    <button
                        className="button green"
                        onClick={() => showModal(PAY_INVOICE, { invoiceID: id })}
                    >
                        Pay
                    </button>
                )}
                <LinkWithPropsContainer
                    to={{
                        pathname: `/company/invoices/${id}`,
                        state: { fromURL: location.pathname },
                    }}
                >
                    View
                </LinkWithPropsContainer>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(InvoiceListItem);
