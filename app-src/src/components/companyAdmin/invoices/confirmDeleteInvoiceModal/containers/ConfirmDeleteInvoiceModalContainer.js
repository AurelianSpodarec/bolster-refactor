import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import deleteInvoice from 'actions/companyAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ConfirmDeleteInvoiceModal from '../presentational/ConfirmDeleteInvoiceModal';

class ConfirmDeleteInvoiceModalContainer extends Component {
    render() {
        const { id, hideModal, isDeleting } = this.props;
        return (
            <ConfirmDeleteInvoiceModal
                handleDelete={this.handleDelete}
                hideModal={hideModal}
                message={`Are you sure you want to delete invoice ${id}?`}
                isDeleting={isDeleting}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { deleteSuccess /*showModal*/ } = this.props;
        if (!prevProps.deleteSuccess && deleteSuccess) {
            // do something here
        }
    }

    handleDelete = () => {
        const { deleteInvoice, id } = this.props;
        // TODO Put the below function in once the api endpoint has been created for it.
        deleteInvoice(id);
    };
}

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
    )(ConfirmDeleteInvoiceModalContainer)
);
