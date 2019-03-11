import React from 'react';

import Block from 'components/shared/generic/block/presentational/Block';
import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';

const SitesTable = ({ sites, isFetching, error }) => {
    return (
        <Block>
            <Table
                headers={['Site name', 'Owned by', 'Premissions', 'Action']}
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
