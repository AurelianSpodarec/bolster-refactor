import React, { useEffect, useState } from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';

const DocumentsTable = ({
    items,
    forwardRef,
    isSorting = false,
    postItemsSort,
    currentPage,
    setCurrentPage = () => {},
    limit = 50,
    setPageSize = () => {},
}) => {
    const headers = ['', '', 'Name', 'Uploaded by', 'Uploaded', 'File size'];

    const maxPage = Math.ceil(items.length / limit);

    useEffect(() => {
        if (currentPage > maxPage) setCurrentPage(1);
    }, [maxPage, currentPage]);

    return (
        <BlockContainer>
            <BlockHeading title="Files & Folders" classes="w-table">
                <PageSelector setPage={setCurrentPage} page={currentPage} maxPage={maxPage} />
                {/* <button className="button" onClick={() => {}}>
                    <i className="far fa-sort" /> Sort Mode
                </button> */}
            </BlockHeading>

            <Table
                withActions
                headers={headers}
                isFetching={false}
                error={null}
                noData={!items.length}
                noDataMessage="No documents to display"
                withoutTBody
                extraClasses={`${isSorting ? 'dragging' : ''}`}
                tableColumnWidths={['50px', '50px']}
            >
                <DocumentsList
                    forwardRef={forwardRef}
                    isSorting={isSorting}
                    colCount={headers.length}
                    items={items}
                    headers={headers}
                    postItemsSort={postItemsSort}
                />
            </Table>
        </BlockContainer>
    );
};

export default withDropZone(DocumentsTable, 'SITE');
