import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SitesTable = ({ headers, sites, isFetching, error }) => {
    return (
        <BlockContainer>
            <BlockHeading title="Sites" classes="w-table" />

            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!sites.length}
                noDataMessage="No sites to display"
            >
                <SitesList colCount={headers.length} sites={sites} />
            </Table>
        </BlockContainer>
    );
};

export default SitesTable;
