import React from 'react';
import DocumentsGridItem from './DocumentsGridItem';

const DocumentsGrid = ({ items }) => {
    return (
        <div className="documents-grid">
            {items.map((item, i) => (
                <DocumentsGridItem item={item} key={i} />
            ))}
        </div>
    );
};

export default DocumentsGrid;
