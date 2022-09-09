import React from 'react';

import BuildingsListItemContainer from '../containers/BuildingsListItemContainer';

const BuildingsList = ({
    colCount,
    buildings,
    forwardRef,
    isSorting,
    headers,
    colSpanFirst = false,
}) => (
    <tbody ref={forwardRef} className={isSorting ? 'sorting' : ''}>
        {buildings.map((building, index) => (
            <BuildingsListItemContainer
                key={building.id}
                colCount={colCount}
                building={building}
                index={index}
                buildings={buildings}
                headers={headers}
                colSpanFirst={colSpanFirst}
            />
        ))}
    </tbody>
);
export default BuildingsList;
