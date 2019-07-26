import React, { Component } from 'react';
import { connect } from 'react-redux';

import deleteInvoice from 'actions/superAdmin/invoices/async/deleteInvoice';

import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';
import ConfirmDeleteModal from 'components/shared/generic/modals/presentational/ConfirmDeleteModal';

class ConfirmDeleteInvoiceModalContainer extends Component {
    render() {
        const { id, hideModal } = this.props;
        return (
            <ConfirmDeleteModal
                handleDelete={this.handleDelete}
                hideModal={hideModal}
                message={`Are you sure you want to delete invoice ${id}?`}
            />
        );
    }

    handleDelete = () => {
        const { deleteInvoice, id } = this.props;
        // TODO Put the below function in once the api endpoint has been created for it.
        console.log(id);
        // deleteInvoice(id);
    };
}

const mapDispatchToProps = dispatch => ({
    hideModal: () => {
        dispatch(hideModal());
    },
    deleteInvoice: id => dispatch(deleteInvoice(id))
});

export default connect(
    null,
    mapDispatchToProps
)(ConfirmDeleteInvoiceModalContainer);
