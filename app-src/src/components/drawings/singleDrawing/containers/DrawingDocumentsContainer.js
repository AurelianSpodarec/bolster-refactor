import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

class DrawingDocumentsContainer extends Component {
    render() {
        const { props } = this;

        return (
            <DocumentsTable
                documents={props.documents}
                isFetching={props.isFetching}
                error={props.error}
            />
        );
    }
}

const mapStateToProps = ({ documentsReducer }) => ({
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

export default connect(mapStateToProps)(DrawingDocumentsContainer);
