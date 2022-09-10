import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentResponsesTable from '../presentational/DocumentResponsesTable';

const DocumentResponsesTableContainer = ({ responses, isFetching }) => {
    return <DocumentResponsesTable responses={responses} isFetching={isFetching} />;
};

const mapStateToProps = (
    {
        companyAdmin: {
            documentsReducer: { documentResponses, isFetching },
        },
    },
    { match: { params } },
) => {
    // group by company user id
    const singleDocumentResponses = documentResponses[params.documentID] || {};
    const responses = Object.values(singleDocumentResponses).sort(
        (a, b) => a.createdByCompanyUserID - b.createdByCompanyUserID,
    );
    return {
        responses,
        isFetching: isFetching,
    };
};

export default withRouter(connect(mapStateToProps)(DocumentResponsesTableContainer));
