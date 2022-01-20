import React from 'react';

import DocumentsListItem from './DocumentsListItem';

const DocumentsList = ({
    items,
    colCount,
    forwardRef,
    isSorting,
    headers,
    postItemsSort,
    selectedItems,
    toggleItemSelect,
}) => (
    <tbody ref={isSorting ? forwardRef : null} className={isSorting ? 'dragging' : ''}>
        {items.map((item, i) => (
            <DocumentsListItem
                key={item.id}
                item={item}
                colCount={colCount}
                index={i}
                headers={headers}
                isSorting={isSorting}
                postItemsSort={postItemsSort}
                isSelected={selectedItems.includes(item.id)}
                toggleItemSelect={toggleItemSelect}
            />
        ))}
    </tbody>
);

export default DocumentsList;
