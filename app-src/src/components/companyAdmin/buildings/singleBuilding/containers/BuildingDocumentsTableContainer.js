import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

// import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

class DocumentsTableContainer extends Component {
    render() {
        const { error, isFetching } = this.props;

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
        const { documents, building } = this.props;
        return documents.filter(document =>
            building.documentIDs.includes(document.id)
        );
    };
}

const mapStateToProps = (
    { companyAdmin: { documentsReducer, buildingsReducer } },
    { match }
) => ({
    building: buildingsReducer.buildings[match.params.id] || {},
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default withRouter(connect(mapStateToProps)(DocumentsTableContainer));
