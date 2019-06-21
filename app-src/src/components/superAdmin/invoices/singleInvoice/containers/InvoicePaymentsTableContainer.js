import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
    ADMIN_EDIT_PAYMENT,
    ADMIN_DELETE_PAYMENT
} from 'constants/shared/modalTypes';
import editInvoicePayment from 'actions/superAdmin/invoices/async/editInvoicePayment';
import deleteInvoicePayment from 'actions/superAdmin/invoices/async/deleteInvoicePayment';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

import InvoicePaymentsTable from '../presentational/InvoicePaymentsTable';

// TODO: move InvoiceItemsTable and children to a shared folder, they are already generic to company/superadmin

const InvoicePaymentsTableContainer = ({
    error,
    isFetching,
    company,
    payments,
    showModal
}) => {
    return (
        <InvoicePaymentsTable
            {...{ payments, error, isFetching, company }}
            headers={['Date', 'Value', '']}
            handleShowModal={handleShowModal}
        />
    );

    function handleShowModal(type, id, value) {
        console.error('here');
        if (type === ADMIN_EDIT_PAYMENT) showModal(ADMIN_EDIT_PAYMENT, { id });
        if (type === ADMIN_DELETE_PAYMENT)
            showModal(ADMIN_DELETE_PAYMENT, { id });
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: {
            invoicePayments,
            isFetching: fetchingInvoices,
            error
        }
    }
}) => ({
    error: error,
    isFetching: fetchingInvoices,
    // change this
    payments: [1, 2, 3]
});

const mapDispatchToProps = {
    showModal,
    editInvoicePayment,
    deleteInvoicePayment
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(InvoicePaymentsTableContainer)
);
