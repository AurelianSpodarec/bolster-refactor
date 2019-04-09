import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { DELETE_DOCUMENT, ERROR_MODAL } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import DeleteDocument from '../presentational/DeleteDocument';

class DeleteDocumentContainer extends Component {
    render() {
        const { document } = this.props;

        return (
            <DeleteDocument
                document={document}
                handleShowModal={this.handleShowModal}
            />
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(ERROR_MODAL, {
                title: 'Deletion Error:',
                message:
                    'An error occurred while deleting this document, please try again later'
            });
        }
    }

    handleShowModal = document => {
        const { showModal } = this.props;
        showModal(DELETE_DOCUMENT, { id: document.id });
    };
}

const mapStateToProps = ({ companyAdmin: { documentsReducer } }) => ({
    deletionError: documentsReducer.deletionError
});

const mapDispatchToProps = dispatch => ({
    showModal: (modalType, modalProps) => {
        dispatch(showModal(modalType, modalProps));
    }
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DeleteDocumentContainer)
);
