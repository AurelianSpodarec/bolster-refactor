import React from 'react';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const DocumentsTable = ({ items, forwardRef, isSorting = false, postSitesSort }) => {
    const headers = ['', '', 'Name', 'Uploaded by', 'Uploaded', 'File size'];
    return (
        <BlockContainer>
            <BlockHeading title="Sites" classes="w-table">
                <button className="button" onClick={() => {}}>
                    <i className="far fa-sort" /> Sort Mode
                </button>
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
            >
                <DocumentsList
                    forwardRef={forwardRef}
                    isSorting={isSorting}
                    colCount={headers.length}
                    items={items}
                    headers={headers}
                    postSitesSort={postSitesSort}
                />
            </Table>
        </BlockContainer>
    );
};

export default withDropZone(DocumentsTable, 'SITE');
