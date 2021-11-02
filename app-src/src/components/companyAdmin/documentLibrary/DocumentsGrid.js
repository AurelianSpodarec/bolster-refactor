import React from 'react';
import DocumentsGridItem from './DocumentsGridItem';

const DocumentsGrid = ({
    items,
    selectedItems = [],
    toggleItemSelect = () => {},
    forwardRef,
    isSorting = false,
    postItemsSort,
    currentPage,
    setCurrentPage = () => {},
    limit = 50,
    setPageSize = () => {},
}) => {
    return (
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
    );
};

export default DocumentsGrid;
