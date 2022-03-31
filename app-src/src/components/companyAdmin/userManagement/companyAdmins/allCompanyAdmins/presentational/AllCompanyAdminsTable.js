import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import AllCompanyAdminsList from './AllCompanyAdminsList';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ActionButton from '../../../../../shared/generic/button/presentational/ActionButton';

const AllCompanyAdminsTable = ({
    headers,
    users,
    isFetching,
    error,
    showDeleteModal,
    handleCreateCompanyAdmin,
}) => {
    return (
        <>
            <BlockHeading title="Active Admins">
                <ActionButton
                    onClick={handleCreateCompanyAdmin}
                    extraClasses="ambient-positive"
                    text="Create Admin"
                    icon="user-plus"
                />
            </BlockHeading>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="No admins to display."
                extraClasses="large"
            >
                <AllCompanyAdminsList
                    colCount={headers.length}
                    users={users}
                    headers={headers}
                    showDeleteModal={showDeleteModal}
                />
            </Table>
        </>
    );
};

export default AllCompanyAdminsTable;
