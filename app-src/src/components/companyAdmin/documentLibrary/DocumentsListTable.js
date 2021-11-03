import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from 'components/shared/generic/tables/presentational/Table';
import DocumentsList from './DocumentsList';
import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import PageSelector from 'components/shared/pagination/presentational/pageSelector';
import DocumentLibraryBreadcrumb from './DocumentLibraryBreadcrumb';

const DocumentsTable = ({
    selectedItems = [],
    toggleItemSelect = () => {},
    items,
    forwardRef,
    isSorting = false,
    postItemsSort,
    currentPage,
    setCurrentPage = () => {},
    limit = 50,
    prefixQuery,
    isFetching,
    fetchError,
}) => {
    const headers = ['', '', 'Name', 'Uploaded by', 'Uploaded', 'File size'];
    const maxPage = Math.ceil(items.length / limit);

    const { librarySearchTerm, libraryFilter } = useSelector(mapStateToProps);

    useEffect(() => {
        if (currentPage > maxPage) setCurrentPage(1);
    }, [maxPage, currentPage]);

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
                <PageSelector setPage={setCurrentPage} page={currentPage} maxPage={maxPage} />
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
