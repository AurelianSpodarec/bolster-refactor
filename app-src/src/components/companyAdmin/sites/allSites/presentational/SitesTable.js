import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const SitesTable = ({ headers, items, isFetching, error, handleAddSite, forwardRef, isOver }) => {
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
                noData={!items.length}
                noDataMessage="No sites to display"
                withoutTBody
                extraClasses={isOver ? 'dragging' : ''}
            >
                <SitesList
                    forwardRef={forwardRef}
                    isOver={isOver}
                    colCount={headers.length}
                    sites={items}
                    headers={headers}
                />
            </Table>
        </BlockContainer>
    );
};

export default withDropZone(SitesTable, 'SITE');
