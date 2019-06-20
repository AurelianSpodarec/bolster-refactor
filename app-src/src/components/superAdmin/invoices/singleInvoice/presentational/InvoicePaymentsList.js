import React from 'react';

import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';

const InvoicePaymentsList = ({ payments }) =>
    payments.map(payment => (
        <tr key={payment.id}>
            <td>{'##07/07/19##'}</td>
            <td>{'£##80.79##'}</td>
            <td>
                <BlockButtonWrapper>
                    <button className="button yellow">
                        <i className="fal fa-pencil" /> Edit
                    </button>
                    <button className="button red">
                        <i className="far fa-times" /> Delete
                    </button>
                </BlockButtonWrapper>
            </td>
        </tr>
    ));

export default InvoicePaymentsList;
