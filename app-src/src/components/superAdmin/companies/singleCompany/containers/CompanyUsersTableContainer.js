import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanyUsersTable from '../presentational/CompanyUsersTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

class CompanyUsersTableContainer extends Component {
    render() {
        const { users, error, isFetching } = this.props;
        const headers = [
            'Name',
            'Email',
            'Phone #',
            'User Type',
            'Operative Code',
            'Linked Device?',
            ''
        ];
        return (
            <BlockContainer>
                <CompanyUsersTable {...{ users, error, isFetching, headers }} />
            </BlockContainer>
        );
    }
}

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
    isFetching
});

export default withRouter(connect(mapStateToProps)(CompanyUsersTableContainer));
