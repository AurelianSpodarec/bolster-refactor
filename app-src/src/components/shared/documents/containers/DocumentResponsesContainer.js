import React from 'react';
import { connect } from 'react-redux';

import DocumentResponses from '../presentational/DocumentResponses';
import fetchDocumentResponses from 'actions/companyAdmin/documents/async/fetchDocumentResponses';
import fetchSingleDocument from 'actions/documents/async/fetchSingleDocument';
import { componentDidMount } from 'helpers/generic';

const DocumentResponsesContainer = ({
    document,
    fetchDocumentResponses,
    fetchSingleDocument,
    documentID
}) => {
    componentDidMount(() => {
        fetchDocumentResponses(documentID);
        fetchSingleDocument(documentID);
    });

    return <DocumentResponses document={document} />;
};

const mapStateToProps = (
    { companyAdmin: { documentsReducer } },
    { match: { params } }
) => ({
    document: documentsReducer.documents[params.documentID] || {},
    documentID: params.documentID
});

const mapDispatchToProps = { fetchDocumentResponses, fetchSingleDocument };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DocumentResponsesContainer);
