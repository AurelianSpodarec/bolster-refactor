import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import deleteInvoice from 'actions/companyAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ConfirmDeleteInvoiceModal from '../presentational/ConfirmDeleteInvoiceModal';

class ConfirmDeleteInvoiceModalContainer extends Component {
    render() {
        const { id, hideModal, isDeleting, deleteSuccess } = this.props;
        return (
            <ConfirmDeleteInvoiceModal
                handleDelete={this.handleDelete}
                hideModal={hideModal}
                message={`Are you sure you want to delete invoice ${id}?`}
                isDeleting={isDeleting}
                deleteSuccess={deleteSuccess}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const {
            deleteSuccess,
            location: {
                state: { fromURL }
            },
            history,
            hideModal /*showModal*/
        } = this.props;
        if (!prevProps.deleteSuccess && deleteSuccess) {
            if (/subscription/.test(fromURL)) {
                history.push('/company/subscription');
            } else {
                history.push('/company/invoices');
            }
            hideModal();
        }
    }

    handleDelete = () => {
        const { deleteInvoice, id } = this.props;
        // TODO Put the below function in once the api endpoint has been created for it.
        deleteInvoice(id);
    };
}

const mapStateToProps = ({
    companyAdmin: {
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
