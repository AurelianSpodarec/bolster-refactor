import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllCompanyAdminsList from './AllCompanyAdminsList';

const AllCompanyAdminsTable = ({ headers, users, isFetching, error }) => {
    return (
        <BlockContainer>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="There are no admins to display."
            >
                <AllCompanyAdminsList colCount={headers.length} users={users} />
            </Table>
        </BlockContainer>
    );
};

export default AllCompanyAdminsTable;
