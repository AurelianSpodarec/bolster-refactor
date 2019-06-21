import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADMIN_CONFIRM_FREE_INVOICE } from 'constants/shared/modalTypes';

import InvoicePayments from 'components/superAdmin/invoices/singleInvoice/presentational/InvoicePayments.js';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

const InvoicePaymentsContainer = ({
    isFetching,
    error,
    invoice,
    company,
    showModal
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

    function handleOpenModal() {
        showModal(ADMIN_CONFIRM_FREE_INVOICE, { id: invoice.id });
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
    invoicePayments,
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
