import BlockContainer from 'components/shared/generic/block/containers/BlockContainer';
import BlockHeading from 'components/shared/generic/blockHeading/presentational/BlockHeading';
import React from 'react';
import { useSelector } from 'react-redux';
import DocumentLibraryBreadcrumb from './DocumentLibraryBreadcrumb';
import DocumentsGridItem from './DocumentsGridItem';

const DocumentsGrid = ({
    items,
    selectedItems = [],
    toggleItemSelect = () => {},
    prefixQuery,
    isFetching,
    fetchError,
}) => {
    const { librarySearchTerm, libraryFilter } = useSelector(mapStateToProps);
    return (
        <>
            <BlockContainer
                noDataMessage={
                    !librarySearchTerm && !libraryFilter
                        ? 'No documents to display'
                        : 'No documents match search criteria'
                }
                isFetching={isFetching}
                error={fetchError}
                contentClass="no-overflow"
            >
                <BlockHeading classes="w-table">
                    <DocumentLibraryBreadcrumb prefix={prefixQuery} />
                    {!!selectedItems.length && (
                        <span className="selected-message">
                            <span>{`${selectedItems.length} file${
                                selectedItems.length !== 1 ? 's' : ''
                            } selected`}</span>
                        </span>
                    )}
                </BlockHeading>
            </BlockContainer>
            <BlockContainer contentClass="transparent">
                <div className="documents-grid">
                    {items.map((item, i) => (
                        <DocumentsGridItem
                            item={item}
                            key={i}
                            isSelected={selectedItems.includes(item.id)}
                            toggleItemSelect={toggleItemSelect}
                        />
                    ))}
                </div>
            </BlockContainer>
        </>
    );
};

const mapStateToProps = ({
    companyAdmin: {
        documentLibraryReducer: { librarySearchTerm, libraryFilter },
    },
}) => ({ librarySearchTerm, libraryFilter });

export default DocumentsGrid;
