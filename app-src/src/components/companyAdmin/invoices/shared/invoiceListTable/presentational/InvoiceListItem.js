import React from 'react';
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

import { PAYMENT_TYPES } from 'constants/companyAdmin/enums';
import { PAY_INVOICE } from 'constants/shared/modalTypes';

const InvoiceListItem = ({
    invoice: { createdOn, isPaid, total, id, paymentType },
    showModal
}) => (
    <tr>
        <td>{moment(createdOn).format('DD/MM/YYYY')}</td>
        <td>{id}</td>
        <td>{`£${total.toFixed(2)}`}</td>
        <td>{PAYMENT_TYPES[paymentType]}</td>
        <td>{isPaid ? 'Paid' : 'Awaiting Payment'}</td>
        <td>{!isPaid && <i className="fa fa-exclamation" />}</td>
        <td>
            <BlockButtonWrapper>
                <Link to={`/company/invoices/${id}`} className="button">
                    View
                </Link>
                {!isPaid && (
                    <button
                        className="button"
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
