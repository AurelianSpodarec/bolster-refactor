import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fetchCompanyUsers from 'actions/superAdmin/users/async/fetchCompanyUsers';

import CompanyUsersTable from '../presentational/CompanyUsersTable';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import BlockButtonWrapper from 'components/shared/generic/blockButtonWrappers/presentational/BlockButtonWrapper';
import { showModal } from 'actions/shared/generic/modals/sync/showModal';
import { ADMIN_CREATE_COMPANY_ADMIN, ADMIN_EDIT_COMPANY_OWNER } from 'constants/shared/modalTypes';

import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import fetchCompanyAdminUsers from 'actions/superAdmin/users/async/fetchCompanyAdminUsers';

const CompanyUsersTableContainer = ({
    users,
    companyUsersInfo,
    error,
    isFetching,
    headers,
    match,
    showModal,
}) => {
    const dispatch = useDispatch();
    const id = match.params.id;

    const setPage = nextPage => {
        dispatch(fetchCompanyUsers(id, nextPage));
    };

    useEffect(() => {
        dispatch(fetchCompanyAdminUsers(id));
    }, []);

    return (
        <BlockContainer>
            <div className="size-lg-6 size-md-12">
                <BlockHeading title="Users">
                    <PageSelector
                        setPage={setPage}
                        page={companyUsersInfo.page}
                        maxPage={companyUsersInfo.maxPage}
                    />
                </BlockHeading>
            </div>
            <BlockButtonWrapper additionalClasses="no-margin" sizeClasses="size-lg-6 size-md-12">
                <button
                    className="button yellow"
                    onClick={handleShowEditCompanyOwnerModal}
                    type="button"
                    disabled={isFetching}
                >
                    <i className="fa fa-edit" /> Edit Company Owner
                </button>
                <button className=" button green" onClick={handleShowAddModal} type="button">
                    <i className="fa fa-plus" /> Add Company Admin
                </button>
            </BlockButtonWrapper>
            <CompanyUsersTable
                {...{ users, error, isFetching, headers }}
                tableColumnWidths={tableColumnWidths}
            />
        </BlockContainer>
    );

    function handleShowAddModal() {
        const companyID = match.params.id;
        showModal(ADMIN_CREATE_COMPANY_ADMIN, { companyID });
    }

    function handleShowEditCompanyOwnerModal() {
        const companyID = match.params.id;

        showModal(ADMIN_EDIT_COMPANY_OWNER, { companyID, users });
    }
};

const tableColumnWidths = ['260px', '130px', '120px', '160px', '150px', '130px', '130px', '160px'];

const mapStateToProps = ({
    superAdmin: {
        usersReducer: { companyUsers, companyUsersInfo, error, isFetching },
    },
}) => ({
    users: Object.values(companyUsers),
    companyUsersInfo,
    error,
    isFetching,
    headers: [
        'Name',
        'Phone #',
        'User Type',
        'Operative Code',
        'Linked Device?',
        'App Version',
        'Device Type',
        'Is e-mail confirmed?',
        '',
    ],
});

const mapDispatchToProps = { showModal };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CompanyUsersTableContainer));
