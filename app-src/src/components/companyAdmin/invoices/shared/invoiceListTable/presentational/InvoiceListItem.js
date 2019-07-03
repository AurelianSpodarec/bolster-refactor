import React from 'react';
import { withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PAYMENT_TYPES, DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { PAY_INVOICE } from 'constants/shared/modalTypes';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import { formatCurrency } from 'helpers/generic';
import StatusIcon from 'components/shared/generic/statusIcon/presentationl/StatusIcon';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const InvoiceListItem = ({
    invoice: {
        createdOn,
        isPaid,
        subTotal,
        total,
        id,
        paymentType,
        userFirstName,
        userLastName,
        remainingToPay
    },
    showModal
}) => (
    <tr>
        <td>
            <DateTimeContainer
                date={createdOn}
                datetime={DATE_TIME_IDS.DATETIME}
            />
        </td>
        <td>{id}</td>
        <td>{`£${formatCurrency(subTotal)}`}</td>
        <td>{`£${formatCurrency(total)}`}</td>
        <td>{`£${remainingToPay && remainingToPay > 0 ? formatCurrency(remainingToPay) : 0}`}</td>
        <td>{PAYMENT_TYPES[paymentType]}</td>
        <td>{isPaid ? 'Paid' : 'Awaiting Payment'}</td>
        <td>
            {!isPaid && (
                // <i
                //     className="fa fa-exclamation-triangle far"
                //     // TODO ##needs styling##
                //     style={{
                //         color: 'yellow',
                //         fontSize: '2em',
                //         backgroundColor: 'black',
                //         borderRadius: '0.1em',
                //         padding: '0.05em'
                //     }}
                // />
                <StatusIcon
                    classes="warning"
                    iconClass="fa fa-exclamation-triangle far"
                />
            )}
        </td>
        <td>{`${userFirstName} ${userLastName}`}</td>
        <td>
            <BlockButtonWrapper>
                {!isPaid && (
                    <button
                        className="button green"
                        onClick={() =>
                            showModal(PAY_INVOICE, { invoiceID: id })
                        }
                    >
                        Pay
                    </button>
                )}
                <ButtonContainer to={`/company/invoices/${id}`}>
                    View
                </ButtonContainer>
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(InvoiceListItem);
