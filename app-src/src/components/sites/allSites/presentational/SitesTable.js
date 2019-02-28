import React from 'react';

import Table from 'components/generic/presentational/Table';
import SitesList from './SitesList';

const SitesTable = ({ sites, ...rest }) => {
    return (
        <div className="content-area size-lg-12">
            <Table
                {...rest}
                noData={!sites.length}
                noDataMessage="There are no sites to display."
            >
                <SitesList sites={sites} />
            </Table>
        </div>
    );
};

export default SitesTable;
