import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

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
        const { documents, floor } = this.props;
        return documents.filter(document =>
            floor.documentIDs.includes(document.id)
        );
    };
}

const mapStateToProps = (
    { companyAdmin: { documentsReducer, floorsReducer } },
    { match }
) => ({
    floor: floorsReducer.floors[match.params.id] || { documentIDs: [] },
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default withRouter(connect(mapStateToProps)(DocumentsTableContainer));
