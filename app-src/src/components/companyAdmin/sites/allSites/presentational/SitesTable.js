import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';

const SitesTable = ({ headers, sites, isFetching, error, handleAddSite }) => {
    return (
        <BlockContainer>
            <BlockHeading title="Sites" classes="w-table">
                <button onClick={handleAddSite} className="button green">
                    <i className="fa fa-plus" /> Add site
                </button>
            </BlockHeading>

            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!sites.length}
                noDataMessage="No sites to display"
                withoutTBody
            >
                <SitesList
                    colCount={headers.length}
                    items={sites}
                    headers={headers}
                />
            </Table>
        </BlockContainer>
    );
};

export default SitesTable;
