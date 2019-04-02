import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';

const SitesTable = ({ headers, sites, isFetching, error }) => {
    return (
        <Block>
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
        </Block>
    );
};

export default SitesTable;
