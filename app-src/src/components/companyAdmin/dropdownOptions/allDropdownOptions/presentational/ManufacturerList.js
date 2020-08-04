import React from 'react';

import ManufacturerListItemContainer from '../containers/ManufacturerListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const ManufacturerList = ({
    manufacturers,
    colCount,
    headers,
    isCustomSort,
    forwardRef,
    isOver,
    moveItem,
}) => {
    return (
        <tbody ref={isCustomSort ? forwardRef : null} className={isOver ? 'dragging' : ''}>
            {manufacturers.map(manufacturer => (
                <ManufacturerListItemContainer
                    key={manufacturer.id}
                    manufacturer={manufacturer}
                    colCount={colCount}
                    headers={headers}
                    isCustomSort={isCustomSort}
                    moveItem={moveItem}
                />
            ))}
        </tbody>
    );
};
export default withDropZone(ManufacturerList, 'MANUFACTURERS');
