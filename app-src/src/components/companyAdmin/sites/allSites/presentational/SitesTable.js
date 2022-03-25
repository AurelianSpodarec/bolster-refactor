import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';
import ActionButton from 'components/shared/generic/button/presentational/ActionButton';

const SitesTable = ({
    headers,
    items,
    isFetching,
    error,
    handleAddSite,
    forwardRef,
    isSorting,
    toggleIsSortingSites,
    postSitesSort,
}) => {
    return (
        <BlockContainer>
            <BlockHeading title="Sites" classes="w-table">
                <ActionButton
                    onClick={handleAddSite}
                    icon="fa fa-plus"
                    text="Add site"
                    ambient="positive"
                />
                {isSorting ? (
                    <ActionButton
                        onClick={toggleIsSortingSites}
                        icon="far fa-check"
                        text="Finish Sort"
                        ambient="positive"
                    />
                ) : (
                    <ActionButton
                        onClick={toggleIsSortingSites}
                        icon="far fa-sort"
                        text="Sort Mode"
                        source="secondary"
                        ambient="positive"
                    />
                )}
            </BlockHeading>

            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={error}
                noData={!items.length}
                noDataMessage="No sites to display"
                withoutTBody
                extraClasses={`${isSorting ? 'dragging' : ''}`}
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
