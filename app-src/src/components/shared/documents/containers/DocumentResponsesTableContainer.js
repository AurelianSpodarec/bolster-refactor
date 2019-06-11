import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DocumentResponsesTable from '../presentational/DocumentResponsesTable';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { hideModal } from 'actions/shared/generic/modals/sync/hideModal';

const DocumentResponsesTableContainer = ({ responses, users, isFetching }) => {
    return (
        <DocumentResponsesTable
            responses={responses}
            users={users}
            isFetching={isFetching}
        />
    );
};

const mapStateToProps = (
    {
        companyAdmin: {
            documentsReducer: { documentResponses, isFetching },
            companyUsersReducer: { users, isFetching: fetchingUsers }
        }
    },
    { match: { params } }
) => {
    // group by company user id
    const singleDocumentResponses = documentResponses[params.documentID] || {};
    const responses = Object.values(singleDocumentResponses).sort(
        (a, b) => a.createdByCompanyUserID - b.createdByCompanyUserID
    );
    return {
        responses,
        users,
        isFetching: !!(isFetching || fetchingUsers)
    };
};

const mapDispatchToProps = { showModal, hideModal };

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(DocumentResponsesTableContainer)
);
