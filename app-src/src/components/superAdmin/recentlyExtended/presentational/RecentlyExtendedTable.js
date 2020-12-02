import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import RecentlyExtendedList from './RecentlyExtendedList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import ButtonContainer from 'components/shared/generic/button/containers/ButtonContainer';

const RecentlyExtendedTable = ({ recentlyExtended, headers, error, isFetching, downloadCSV }) => (
    <BlockContainer>
        <BlockHeading title="Recently Extended">
            <ButtonContainer handleClick={downloadCSV} className="button green">
                <i className="fa fa-plus" /> Generate CSV
            </ButtonContainer>
        </BlockHeading>
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
);

export default RecentlyExtendedTable;
