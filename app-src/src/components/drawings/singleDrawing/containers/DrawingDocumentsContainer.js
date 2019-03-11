import React, { Component } from 'react';
import { connect } from 'react-redux';

import DocumentsTable from 'components/shared/documents/presentational/DocumentsTable';

import fetchDocuments from 'actions/documents/async/fetchDocuments';

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

    componentDidMount = () => {
        this.props.fetchDocuments();
    };
}

const mapStateToProps = ({ documentsReducer }) => ({
    documents: Object.values(documentsReducer.documents),
    isFetching: documentsReducer.isFetching,
    error: documentsReducer.error
});

const mapDispatchToProps = dispatch => ({
    fetchDocuments: () => {
        dispatch(fetchDocuments());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawingDocumentsContainer);
