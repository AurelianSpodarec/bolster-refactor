import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';

const AllCompanyAdminsTable = ({ headers, users, isFetching, error }) => {
    return (
        <Block>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!users.length}
                noDataMessage="There are no admins to display."
            >
                {/* <AllCompanyAdminsList colCount={headers.length} users={users} /> */}
            </Table>
        </Block>
    );
};

export default AllCompanyAdminsTable;
