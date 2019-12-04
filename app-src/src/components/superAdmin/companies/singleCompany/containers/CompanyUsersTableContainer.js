import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CompanyUsersTable from '../presentational/CompanyUsersTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADMIN_CREATE_COMPANY_ADMIN } from 'constants/shared/modalTypes';

const CompanyUsersTableContainer = ({ users, error, isFetching, headers, match, showModal }) => {
    return (
        <BlockContainer>
            <div className="size-lg-6 size-md-12">
                <BlockHeading title="Users" />
            </div>
            <BlockButtonWrapper
                additionalClasses="no-margin"
                sizeClasses="size-lg-6 size-md-12"
            >
                <button className=" button green" onClick={handleShowAddModal} type="button">
                    <i className="fa fa-plus" /> Add Company Admin
                </button>
            </BlockButtonWrapper>
            <CompanyUsersTable {...{ users, error, isFetching, headers }} />
        </BlockContainer>
    );

    function handleShowAddModal() {
        const companyID = match.params.id;
        showModal(ADMIN_CREATE_COMPANY_ADMIN, {companyID});
    }
};

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

const mapDispatchToProps = { showModal };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyUsersTableContainer));
