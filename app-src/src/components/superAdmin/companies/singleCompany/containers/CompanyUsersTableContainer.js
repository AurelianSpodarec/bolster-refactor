import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanyUsersTable from '../presentational/CompanyUsersTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const CompanyUsersTableContainer = ({ users, error, isFetching, headers }) => (
    <BlockContainer>
        <BlockHeading title="Users" />
        <CompanyUsersTable {...{ users, error, isFetching, headers }} />
    </BlockContainer>
);

const mapStateToProps = (
    {
        superAdmin: {
            usersReducer: { users, error, isFetching }
        }
    },
    { match: { params } }
) => ({
    users: Object.values(users).filter(
        ({ companyID }) => +companyID === +params.id
    ),
    error,
    isFetching,
    headers: [
        'Name',
        'Email',
        'Phone #',
        'User Type',
        'Operative Code',
        'Linked Device?'
    ]
});

export default withRouter(connect(mapStateToProps)(CompanyUsersTableContainer));
