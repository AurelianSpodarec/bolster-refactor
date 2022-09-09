import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import SuperAdminConfirmRestoreInvoiceModal from '../presentational/SuperAdminConfirmRestoreInvoiceModal';
import restoreInvoice from 'actions/superAdmin/invoices/async/restoreInvoice';

const SuperAdminConfirmRestoreInvoiceModalContainer = ({
    id,
    hideModal,
    isRestoring,
    restoreInvoice,
    restoreSuccess,
}) => {
    useEffect(() => {
        if (restoreSuccess) {
            hideModal();
        }
    }, [restoreSuccess]);

    return (
        <SuperAdminConfirmRestoreInvoiceModal
            handleRestore={handleRestore}
            hideModal={hideModal}
            message={`Are you sure you want to restore invoice ${id}?`}
            isRestoring={isRestoring}
            restoreSuccess={restoreSuccess}
        />
    );

    function handleRestore() {
        restoreInvoice(id);
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { isRestoring, restoreSuccess },
    },
}) => ({
    isRestoring,
    restoreSuccess,
});

const mapDispatchToProps = { hideModal, restoreInvoice };

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(SuperAdminConfirmRestoreInvoiceModalContainer),
);
