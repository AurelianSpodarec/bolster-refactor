import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { DELETE_DOCUMENT, DELETION_ERROR } from 'constants/shared/modalTypes';

class SiteDocumentsTableContainer extends Component {
    render() {
        const { error, isFetching } = this.props;

        return (
            <BlockContainer error={error}>
                <DocumentsTable
                    documents={this._getFilteredDocuments()}
                    isFetching={isFetching}
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

    _getFilteredDocuments = () => {
        const { documents, site } = this.props;
        return documents.filter(document =>
            site.documentIDs.includes(document.id)
        );
    };

    handleShowModal = document => {
        const { showModal } = this.props;
        showModal(DELETE_DOCUMENT, { id: document.id });
    };
}

const mapStateToProps = (
    { companyAdmin: { documentsReducer, sitesReducer } },
    { match }
) => ({
    site: sitesReducer.sites[match.params.id] || { documentIDs: [] },
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching || sitesReducer.isFetching,
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
    )(SiteDocumentsTableContainer)
);
