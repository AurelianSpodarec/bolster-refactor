import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import deleteInvoice from 'actions/superAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import SuperAdminConfirmDeleteInvoiceModal from '../presentational/SuperAdminConfirmDeleteInvoiceModal';

const SuperAdminConfirmDeleteInvoiceModalContainer = ({
    id,
    invoice,
    hideModal,
    isDeleting,
    deleteInvoice,
    deleteSuccess,
    history,
    location
}) => {
    useEffect(() => {
        if (deleteSuccess) {
            if (location.state.fromCompany) {
                history.push(`/admin/companies/${invoice.companyID}`);
            } else {
                history.push('/admin/invoices');
            }
            hideModal();
        }
    }, [deleteSuccess]);

    return (
        <SuperAdminConfirmDeleteInvoiceModal
            handleDelete={() => deleteInvoice(id)}
            hideModal={hideModal}
            message={`Are you sure you want to delete invoice ${id}?`}
            isDeleting={isDeleting}
        />
    );
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { isDeleting, deleteSuccess }
    }
}) => ({
    isDeleting,
    deleteSuccess
});

const mapDispatchToProps = { hideModal, deleteInvoice };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(SuperAdminConfirmDeleteInvoiceModalContainer)
);
