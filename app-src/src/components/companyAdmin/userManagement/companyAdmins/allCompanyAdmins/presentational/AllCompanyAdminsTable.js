import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllCompanyAdminsList from './AllCompanyAdminsList';

const AllCompanyAdminsTable = ({
    headers,
    users,
    isFetching,
    error,
    showDeleteModal
}) => {
    return (
        <BlockContainer>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="There are no admins to display."
                extraClasses="large"
            >
                <AllCompanyAdminsList
                    colCount={headers.length}
                    users={users}
                    showDeleteModal={showDeleteModal}
                />
            </Table>
        </BlockContainer>
    );
};

export default AllCompanyAdminsTable;
