import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

import { DELETE_DOCUMENT, DELETION_ERROR } from 'constants/shared/modalTypes';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';

class SiteDocumentsTableContainer extends Component {
    render() {
        const { error, isFetching, parent } = this.props;

        return (
            <BlockContainer error={error}>
                <DocumentsTable
                    documents={this._getFilteredDocuments()}
                    isFetching={isFetching}
                />
            </BlockContainer>
        );
    }

    _getFilteredDocuments = () => {
        const { documents, parent } = this.props;
        return documents.filter(document =>
            parent.documentIDs.includes(document.id)
        );
    };
}

const mapStateToProps = (
    { companyAdmin: { documentsReducer, sitesReducer } },
    { match }
) => ({
    parent: sitesReducer.sites[match.params.id] || { documentIDs: [] },
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
