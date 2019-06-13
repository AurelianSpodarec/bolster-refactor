import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

class DrawingDocumentsTableContainer extends Component {
    render() {
        const { error, isFetching } = this.props;

        return (
            <BlockContainer error={error} containerClass="always-scrollbar">
                <DocumentsTable
                    documents={this._getFilteredDocuments()}
                    isFetching={isFetching}
                    clientControls={true}
                />
            </BlockContainer>
        );
    }

    //api change needed her eto finish
    _getFilteredDocuments = () => {
        const { documents, parent } = this.props;
        return documents.filter(document =>
            parent.documentIDs.includes(document.id)
        );
    };
}

const mapStateToProps = (
    { client: { documentsReducer, drawingsReducer } },
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
