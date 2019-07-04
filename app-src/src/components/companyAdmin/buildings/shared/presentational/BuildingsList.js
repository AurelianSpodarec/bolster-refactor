import React from 'react';

import BuildingsListItemContainer from '../containers/BuildingsListItemContainer';
import withDropZone from 'components/shared/dragDrop/hocs/withDropZone';

const BuildingsList = ({
    colCount,
    buildings,
    forwardRef,
    isOver,
    headers
}) => (
    <tbody ref={forwardRef} className={isOver ? 'dragging' : ''}>
        {buildings.map((building, index) => (
            <BuildingsListItemContainer
                key={building.id}
                colCount={colCount}
                building={building}
                index={index}
                buildings={buildings}
                headers={headers}
            />
        ))}
    </tbody>
);
export default withDropZone(BuildingsList, 'BUILDING');
