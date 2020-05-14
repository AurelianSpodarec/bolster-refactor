import React, { Component } from 'react';
import { connect } from 'react-redux';

import deleteOptionValueDocumentVersion from 'actions/companyAdmin/invoices/async/deleteInvoice';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

import ConfirmDeleteDocumentVersionModal from '../presentational/ConfirmDeleteDocumentVersionModal';

class ConfirmDeleteDocumentVersionModalContainer extends Component {
    render() {
        const { hideModal } = this.props;
        return (
            <ConfirmDeleteDocumentVersionModal
                handleDelete={this.handleDelete}
                hideModal={hideModal}
                message={'Are you sure you want to delete document version?'}
            />
        );
    }

    handleDelete = () => {
        const { deleteOptionValueDocumentVersion, id } = this.props;
        // TODO Put the below function in once the api endpoint has been created for it.
        deleteOptionValueDocumentVersion(id);
    };
}

const mapDispatchToProps = { hideModal, deleteOptionValueDocumentVersion };

export default connect(null, mapDispatchToProps)(ConfirmDeleteDocumentVersionModalContainer);
