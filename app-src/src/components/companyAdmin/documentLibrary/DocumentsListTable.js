import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import DocumentLibraryBreadcrumb from './DocumentLibraryBreadcrumb';
import DocumentLibraryStats from './DocumentLibraryStats';

const DocumentsTable = ({
    selectedItems = [],
    toggleItemSelect = () => {},
    items,
    forwardRef,
    isSorting = false,
    postItemsSort,
    prefixQuery,
    isFetching,
    fetchError,
}) => {
    const headers = [
        '',
        '',
        'Name',
        'Uploaded by',
        'Uploaded',
        'View in app',
        'Attachable to pins',
        'File size',
    ];

    const { librarySearchTerm, libraryFilter } = useSelector(mapStateToProps);

    return (
        <BlockContainer contentClass="no-overflow">
            <BlockHeading classes="w-table">
                <DocumentLibraryBreadcrumb prefix={prefixQuery} />
                {!!selectedItems.length && (
                    <span className="selected-message">
                        <span>{`${selectedItems.length} file${
                            selectedItems.length !== 1 ? 's' : ''
                        } selected`}</span>
                    </span>
                )}
                <DocumentLibraryStats />
            </BlockHeading>

            <Table
                withActions
                headers={headers}
                isFetching={isFetching}
                error={fetchError}
                noData={!items.length}
                noDataMessage={
                    !librarySearchTerm && !libraryFilter
                        ? 'No documents to display'
                        : 'No documents match search criteria'
                }
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
                    selectedItems={selectedItems}
                    toggleItemSelect={toggleItemSelect}
                />
            </Table>
        </BlockContainer>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { librarySearchTerm, libraryFilter },
    },
}) => ({ librarySearchTerm, libraryFilter });

export default DocumentsTable;
