import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import RecentlyDeletedList from './RecentlyDeletedList';

const RecentlyDeletedTable = ({ headers, recentlyDeleted, isFetching, error }) => (
    <BlockContainer>
        <BlockHeading title="Deleted data" />
        <Table
            headers={headers}
            isFetching={isFetching}
            error={error}
            noData={!recentlyDeleted.length}
            noDataMessage="No recently deleted data to display."
            extraClasses="large"
        >
            <RecentlyDeletedList
                colCount={headers.length}
                recentlyDeleted={recentlyDeleted}
                headers={headers}
            />
        </Table>
    </BlockContainer>
);

export default RecentlyDeletedTable;
