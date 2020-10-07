import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import SitesList from './SitesList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

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
                <button onClick={handleAddSite} className="button green">
                    <i className="fa fa-plus" /> Add site
                </button>
                {isSorting ? (
                    <button className="button green" onClick={toggleIsSortingSites}>
                        <i className="far fa-check" /> Finish Sort
                    </button>
                ) : (
                    <button className="button" onClick={toggleIsSortingSites}>
                        <i className="far fa-sort" /> Sort Mode
                    </button>
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
