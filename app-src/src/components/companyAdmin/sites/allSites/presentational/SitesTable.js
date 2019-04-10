import React from 'react';
import { Link } from 'react-router-dom';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SitesTable = ({ headers, sites, isFetching, error }) => {
    return (
        <BlockContainer>
            <BlockHeading title="Sites Table" classes="w-table">
                <Link to="/company/sites/create" className="button">
                    <i className="fa fa-plus" /> Add site
                </Link>
            </BlockHeading>

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
