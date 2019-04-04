import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import AllOperativesList from './AllOperativesList';

const AllOperativesTable = ({ headers, users, isFetching, error }) => {
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
                <AllOperativesList colCount={headers.length} users={users} />
            </Table>
        </BlockContainer>
    );
};

export default AllOperativesTable;
