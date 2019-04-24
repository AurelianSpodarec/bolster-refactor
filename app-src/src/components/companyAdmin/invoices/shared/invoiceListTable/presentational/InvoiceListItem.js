import React from 'react';
import { withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PAYMENT_TYPES, DATE_TIME_IDS } from 'constants/companyAdmin/enums';
import { PAY_INVOICE } from 'constants/shared/modalTypes';
import DateTimeContainer from 'components/shared/dateTime/containers/DateTimeContainer';
import ButtonNoClickContainer from 'components/shared/generic/button/containers/ButtonNoClickContainer';
import { formatCurrency } from 'helpers/generic';

const InvoiceListItem = ({
    invoice: { createdOn, isPaid, total, id, paymentType },
    showModal
}) => (
    <tr>
        <td>
            <DateTimeContainer date={createdOn} datetime={DATE_TIME_IDS.DATE} />
        </td>
        <td>{id}</td>
        <td>{`£${formatCurrency(total)}`}</td>
        <td>{PAYMENT_TYPES[paymentType]}</td>
        <td>{isPaid ? 'Paid' : 'Awaiting Payment'}</td>
        <td>{!isPaid && <i className="fa fa-exclamation" />}</td>
        <td>
            <BlockButtonWrapper>
                <ButtonNoClickContainer to={`/company/invoices/${id}`}>
                    View
                </ButtonNoClickContainer>

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
            </BlockButtonWrapper>
        </td>
    </tr>
);

export default withRouter(InvoiceListItem);
