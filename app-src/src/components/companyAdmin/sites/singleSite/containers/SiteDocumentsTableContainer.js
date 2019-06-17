import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class SiteDocumentsTableContainer extends Component {
    render() {
        const { error, isFetching, parent } = this.props;

        return (
            <BlockContainer error={error}>
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
    { companyAdmin: { documentsReducer, sitesReducer } },
    { match }
) => ({
    parent: sitesReducer.sites[match.params.id] || { documentIDs: [] },
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default withRouter(
    connect(mapStateToProps)(SiteDocumentsTableContainer)
);
