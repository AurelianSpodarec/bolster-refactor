import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADMIN_CONFIRM_PAYMENT,
    ADMIN_CONFIRM_FREE_INVOICE
} from 'constants/shared/modalTypes';

import InvoicePayments from 'components/superAdmin/invoices/singleInvoice/presentational/InvoicePayments.js';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

const InvoicePaymentsContainer = ({
    isFetching,
    error,
    invoice,
    company,
    showModal
}) => {
    const [paymentValue, changePaymentInput] = useState(Number(0).toFixed(2));
    return (
        <InvoicePayments
            paymentValue={paymentValue}
            handleChange={handleChange}
            isFetching={isFetching}
            error={error}
            invoice={invoice}
            company={company}
            handleOpenModal={handleOpenModal}
        />
    );

    function handleChange(e) {
        changePaymentInput(e.target.value);
    }

    function handleOpenModal(type) {
        if (type === ADMIN_CONFIRM_FREE_INVOICE) {
            showModal(ADMIN_CONFIRM_FREE_INVOICE, { id: invoice.id });
        }
        if (type === ADMIN_CONFIRM_PAYMENT) {
            showModal(ADMIN_CONFIRM_PAYMENT, {
                id: invoice.id,
                value: paymentValue
            });
        }
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices, isFetching, error },
            companiesReducer: {
                companies,
                isFetching: isFetchingCompanies,
                error: companiesError
            }
        }
    },
    {
        match: {
            params: { companyID, id }
        }
    }
) => ({
    invoice: invoices[id] || null,
    isFetching: isFetching || isFetchingCompanies,
    error: error || companiesError,
    company: companies[companyID] || null
});

const mapDispatchToProps = dispatch => ({
    showModal: (type, props) => dispatch(showModal(type, props))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoicePaymentsContainer)
);
