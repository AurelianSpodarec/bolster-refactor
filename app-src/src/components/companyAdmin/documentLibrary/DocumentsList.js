import React from 'react';

import DocumentsListItem from './DocumentsListItem';

const DocumentsList = ({ items, colCount, forwardRef, isSorting, headers, postSitesSort }) => (
    <tbody ref={isSorting ? forwardRef : null} className={isSorting ? 'dragging' : ''}>
        {items.map((item, i) => (
            <DocumentsListItem
                key={item.id}
                item={item}
                colCount={colCount}
                index={i}
                headers={headers}
                isSorting={isSorting}
                postSitesSort={postSitesSort}
            />
        ))}
    </tbody>
);

export default DocumentsList;
