import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

class DrawingDocumentsTableContainer extends Component {
    render() {
        const { error, isFetching, parent } = this.props;

        return (
            <BlockContainer error={error} containerClass="always-scrollbar">
                <DocumentsTable
                    accessType={parent.accessType}
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
    { companyAdmin: { documentsReducer, drawingsReducer } },
    { match }
) => ({
    parent: drawingsReducer.drawings[match.params.id] || {
        documentIDs: []
    },
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default withRouter(
    connect(mapStateToProps)(DrawingDocumentsTableContainer)
);
