import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const SitesTable = ({
    headers,
    items,
    isFetching,
    error,
    forwardRef,
    isSorting,
    postSitesSort,
    sortDirection,
    sortName,
}) => {
    return (
        <BlockContainer contentClass="content-stroke no-bottom-spacing">
            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!items.length}
                noDataMessage="No sites to display"
                withoutTBody
                extraClasses={`${isSorting ? 'dragging' : ''}`}
                isSortable
                sortDirection={sortDirection}
                sortName={sortName}
                disabledSort={isSorting}
            >
                <SitesList
                    forwardRef={forwardRef}
                    isSorting={isSorting}
                    colCount={headers.length}
                    sites={items}
                    headers={headers}
                    postSitesSort={postSitesSort}
                />
            </Table>
        </BlockContainer>
    );
};

export default withDropZone(SitesTable, 'SITE');
