import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';

const SitesTable = ({ sites, headers, isFetching, error }) => {
    return (
        <Block>
            <Table
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!sites.length}
                noDataMessage="There are no sites to display."
            >
                <SitesList sites={sites} />
            </Table>
        </Block>
    );
};

export default SitesTable;
