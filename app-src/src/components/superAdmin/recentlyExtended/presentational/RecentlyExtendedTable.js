import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import RecentlyExtendedList from './RecentlyExtendedList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const RecentlyExtendedTable = ({ recentlyExtended, headers, error, isFetching }) => {
    return (
        <>
            <BlockContainer>
                <BlockHeading title="Recently Extended"></BlockHeading>
                <Table
                    withActions
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={!recentlyExtended.length}
                    noDataMessage="No Recent Extensions (last 30 days) to display"
                >
                    <RecentlyExtendedList recentlyExtended={recentlyExtended} />
                </Table>
            </BlockContainer>
        </>
    );
};

export default RecentlyExtendedTable;
