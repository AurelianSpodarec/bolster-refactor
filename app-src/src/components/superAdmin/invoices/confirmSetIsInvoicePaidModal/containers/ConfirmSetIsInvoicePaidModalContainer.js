import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ConfirmSetIsInvoicePaidModal from '../presentational/ConfirmSetIsInvoicePaidModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { SUCCESS_MODAL, ERROR_MODAL } from 'constants/shared/modalTypes';
import setIsInvoicePaid from 'actions/superAdmin/invoices/async/setIsInvoicePaid';

const ConfirmSetIsInvoicePaidModalContainer = ({
    hideModal,
    isPaid,
    setIsInvoicePaid,
    id,
    postSuccess,
    error,
    showModal
}) => {
    useEffect(() => {
        if (postSuccess) {
            showModal(SUCCESS_MODAL, {
                message: 'The invoice has successfully been made free.'
            });
        }
        if (error) {
            showModal(ERROR_MODAL, {
                message:
                    'There was a problem processing your request. Please try again later.'
            });
        }
    }, [postSuccess, error]);

    return (
        <ConfirmSetIsInvoicePaidModal
            handleSubmit={handleSubmit}
            isPaid={isPaid}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
        />
    );

    function handleSubmit() {
        setIsInvoicePaid(id, !isPaid);
    }
};

const mapStateToProps = ({
    superAdmin: {
        invoicesReducer: { postSuccess, error }
    }
}) => ({
    postSuccess,
    error
});

const mapDispatchToProps = {
    hideModal,
    setIsInvoicePaid,
    showModal
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmSetIsInvoicePaidModalContainer);
