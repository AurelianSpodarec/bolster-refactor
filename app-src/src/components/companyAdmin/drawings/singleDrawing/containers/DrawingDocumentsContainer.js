import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { DELETION_ERROR, DELETE_DOCUMENT } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class DrawingDocumentsContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <DocumentsTable
                    documents={this._getFilteredDocuments()}
                    isFetching={props.isFetching}
                    error={props.error}
                    handleShowModal={this.handleShowModal}
                />
            </BlockContainer>
        );
    }

    componentDidUpdate(prevProps) {
        const { deletionError, showModal } = this.props;
        if (deletionError && !prevProps.deletionError) {
            showModal(DELETION_ERROR, {
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

    _getFilteredDocuments = () => {
        const { documents, drawing } = this.props;
        return documents.filter(document =>
            drawing.documentIDs.includes(document.id)
        );
    };
}

const mapStateToProps = (
    { companyAdmin: { documentsReducer, drawingsReducer } },
    { match }
) => ({
    drawing: drawingsReducer.drawings[match.params.id] || { documentIDs: [] },
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error,
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
    )(DrawingDocumentsContainer)
);
