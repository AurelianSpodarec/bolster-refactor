import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import deleteInvoice from 'actions/superAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import SuperAdminConfirmRestoreInvoiceModal from '../presentational/SuperAdminConfirmRestoreInvoiceModal';

const SuperAdminConfirmRestoreInvoiceModalContainer = ({
    id,
    invoice,
    hideModal,
    isDeleting,
    deleteInvoice,
    deleteSuccess,
    history,
    location,
}) => {
    useEffect(() => {
        if (deleteSuccess) {
            hideModal();
        }
    }, [deleteSuccess]);

    return (
        <SuperAdminConfirmRestoreInvoiceModal
            handleDelete={handleDelete}
            hideModal={hideModal}
            message={`Are you sure you want to restore invoice ${id}?`}
            isDeleting={isDeleting}
            deleteSuccess={deleteSuccess}
        />
    );

    function handleDelete(comments) {
        // deleteInvoice(id, comments);
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { isDeleting, deleteSuccess },
    },
}) => ({
    isDeleting,
    deleteSuccess,
});

const mapDispatchToProps = { hideModal, deleteInvoice };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SuperAdminConfirmRestoreInvoiceModalContainer),
);
