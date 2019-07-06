import React from 'react';

import {
    ADMIN_EDIT_PAYMENT,
    ADMIN_DELETE_PAYMENT
} from 'constants/shared/modalTypes';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const InvoicePaymentsList = ({ payments, handleShowModal }) =>
    payments.map(payment => (
        <tr key={payment.id}>
            <td>{'##07/07/19##'}</td>
            <td>{'£##80.79##'}</td>
            <td>
                <BlockButtonWrapper>
                    <button
                        onClick={() =>
                            handleShowModal(ADMIN_EDIT_PAYMENT, payment.id)
                        }
                        className="button yellow"
                    >
                        <i className="fal fa-pencil" /> Edit
                    </button>
                    <button
                        onClick={() =>
                            handleShowModal(ADMIN_DELETE_PAYMENT, payment.id)
                        }
                        className="button red"
                    >
                        <i className="far fa-times" /> Delete
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    ));

export default InvoicePaymentsList;
