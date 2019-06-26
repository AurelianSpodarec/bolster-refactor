import React from 'react';

import {
    ADMIN_EDIT_PAYMENT,
    ADMIN_DELETE_PAYMENT
} from 'constants/shared/modalTypes';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import invoicePayments from 'reducers/superAdmin/invoicePayments';
import {
    DATE_TIME_DEFAULTS,
    PAYMENT_TYPES
} from 'constants/companyAdmin/enums';
import moment from 'moment';

const InvoicePaymentsList = ({ invoicePayments, handleShowModal }) =>
    invoicePayments.map(
        ({ id, createdOn, amount, paymentMethod, invoiceID }) => (
            <tr key={id}>
                <td>{moment(createdOn).format(DATE_TIME_DEFAULTS[1])}</td>
                <td>{amount.toFixed(2)}</td>
                <td>{PAYMENT_TYPES[paymentMethod]}</td>
                <td>
                    <BlockButtonWrapper>
                        <button
                            onClick={() =>
                                handleShowModal(
                                    ADMIN_EDIT_PAYMENT,
                                    id,
                                    amount,
                                    invoiceID,
                                    paymentMethod
                                )
                            }
                            className="button yellow"
                        >
                            <i className="fal fa-pencil" /> Edit
                        </button>
                        <button
                            onClick={() =>
                                handleShowModal(
                                    ADMIN_DELETE_PAYMENT,
                                    id,
                                    amount,
                                    invoiceID
                                )
                            }
                            className="button red"
                        >
                            <i className="far fa-times" /> Delete
                        </button>
                    </BlockButtonWrapper>
                </td>
            </tr>
        )
    );

export default InvoicePaymentsList;
