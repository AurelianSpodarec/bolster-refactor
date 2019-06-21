import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADMIN_CONFIRM_FREE_INVOICE,
    ADMIN_RECORD_PAYMENT
} from 'constants/shared/modalTypes';

import InvoicePayments from 'components/superAdmin/invoices/singleInvoice/presentational/InvoicePayments.js';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

const InvoicePaymentsContainer = ({
    isFetching,
    error,
    invoice,
    company,
    showModal,
    invoicePayments
}) => {
    return (
        <InvoicePayments
            isFetching={isFetching}
            error={error}
            invoice={invoice}
            company={company}
            handleOpenModal={handleOpenModal}
        />
    );

    function handleOpenModal(type) {
        if (type === ADMIN_CONFIRM_FREE_INVOICE)
            showModal(ADMIN_CONFIRM_FREE_INVOICE, { id: invoice.id });
        if (type === ADMIN_RECORD_PAYMENT)
            showModal(ADMIN_RECORD_PAYMENT, {
                invoice,
                invoicePayments
            });
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices, isFetching, error },
            invoicePaymentsReducer: {
                invoicePayments,
                isFetching: isFetchingPayments,
                error: paymentsError
            },
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
    invoicePayments: Object.values(invoicePayments).filter(
        ({ invoiceID }) => invoiceID === id
    ),
    invoice: invoices[id] || null,
    isFetching: isFetching || isFetchingCompanies || isFetchingPayments,
    error: error || companiesError || paymentsError,
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
