import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { ADMIN_EDIT_PAYMENT, ADMIN_DELETE_PAYMENT } from 'constants/shared/modalTypes';
import editInvoicePayment from 'actions/superAdmin/invoices/async/editInvoicePayment';
import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import InvoicePaymentsTable from '../presentational/InvoicePaymentsTable';

const InvoicePaymentsTableContainer = ({
    error,
    isFetching,
    company,
    invoicePayments,
    showModal,
    invoice,
    companies,
}) => {
    return (
        <InvoicePaymentsTable
            {...{ invoicePayments, error, isFetching, company, companies }}
            headers={['ID', 'Date', 'Value', 'Payment Method', '']}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal(type, id, value, invoiceID, paymentMethod) {
        if (type === ADMIN_EDIT_PAYMENT)
            showModal(ADMIN_EDIT_PAYMENT, {
                id,
                invoice,
                invoicePayments,
                value,
                invoiceID,
                paymentMethod,
            });
        if (type === ADMIN_DELETE_PAYMENT)
            showModal(ADMIN_DELETE_PAYMENT, { id, value, invoiceID });
    }
};

const mapStateToProps = (
    {
        superAdmin: {
            invoicesReducer: { invoices },
            invoicePaymentsReducer: {
                invoicePayments,
                isFetching: fetchingInvoices,
                error: invoicesError,
            },
            companiesReducer: { companies, isFetching: fetchingCompanies, error: companiesError },
        },
    },
    { match },
) => ({
    invoice: invoices[match.params.id],
    error: invoicesError || companiesError,
    isFetching: fetchingInvoices || fetchingCompanies,
    invoicePayments: Object.values(invoicePayments) || [],
    companies: Object.values(companies),
});

const mapDispatchToProps = {
    showModal,
    editInvoicePayment,
    deleteInvoicePayment,
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(InvoicePaymentsTableContainer),
);
