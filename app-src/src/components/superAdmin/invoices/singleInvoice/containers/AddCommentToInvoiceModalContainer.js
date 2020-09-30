import React from 'react';
import { connect } from 'react-redux';

import ConfirmAddCommentModal from 'components/shared/generic/modals/presentational/ConfirmAddCommentModal';
import addCommentToInvoice from 'actions/superAdmin/invoices/async/addCommentToInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const AddCommentToInvoiceModalContainer = ({ id, comment, handleAddComment, hideModal }) => {
    return (
        <ConfirmAddCommentModal
            handleAdd={() => handleAddComment(id, comment)}
            hideModal={e => {
                e.preventDefault();
                hideModal();
            }}
            message="Are you sure you want to add comment to this invoice?"
        />
    );
};

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    handleAddComment: (id, comment) => {
        dispatch(addCommentToInvoice(id, comment));
        dispatch(hideModal());
    },
});

export default connect(null, mapDispatchToProps)(AddCommentToInvoiceModalContainer);
