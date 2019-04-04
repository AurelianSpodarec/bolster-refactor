import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';

const SitesTable = ({ headers, sites, isFetching, error }) => {
    return (
        <BlockContainer>
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!sites.length}
                noDataMessage="There are no sites to display."
            >
                <SitesList colCount={headers.length} sites={sites} />
            </Table>
        </BlockContainer>
    );
};

export default SitesTable;
