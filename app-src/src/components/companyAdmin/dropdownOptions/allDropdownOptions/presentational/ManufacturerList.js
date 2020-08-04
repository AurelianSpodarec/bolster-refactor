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
    type,
}) => {
    return (
        <tbody ref={isCustomSort ? forwardRef : null} className={isOver ? 'dragging' : ''}>
            {manufacturers.map((manufacturer, i) => (
                <ManufacturerListItemContainer
                    key={manufacturer.id}
                    manufacturer={manufacturer}
                    colCount={colCount}
                    headers={headers}
                    isCustomSort={isCustomSort}
                    moveItem={moveItem}
                    type={type}
                    index={i}
                    manufacturers={manufacturers}
                />
            ))}
        </tbody>
    );
};
export default withDropZone(ManufacturerList, 'MANUFACTURERS');
