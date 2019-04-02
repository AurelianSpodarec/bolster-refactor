import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class DrawingDocumentsContainer extends Component {
    render() {
        const { props } = this;

        return (
            <BlockContainer>
                <DocumentsTable
                    documents={this._getFilteredDocuments()}
                    isFetching={props.isFetching}
                    error={props.error}
                />
            </BlockContainer>
        );
    }

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
    drawing: drawingsReducer.drawings[match.params.id],
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default withRouter(connect(mapStateToProps)(DrawingDocumentsContainer));
