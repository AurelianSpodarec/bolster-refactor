import React from 'react';

import Table from 'components/generic/tables/presentational/Table';
import SitesList from './SitesList';

const SitesTable = ({ sites, headers, isFetching, error }) => {
    return (
        <div className="content-container size-lg-12">
            <div className="content-area size-lg-12">
                <Table
                    headers={headers}
                    isFetching={isFetching}
                    error={error}
                    noData={!sites.length}
                    noDataMessage="There are no sites to display."
                >
                    <SitesList sites={sites} />
                </Table>
            </div>
        </div>
    );
};

export default SitesTable;
