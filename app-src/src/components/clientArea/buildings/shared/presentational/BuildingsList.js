import React from 'react';

import BuildingsListItemContainer from '../containers/BuildingsListItemContainer';

const BuildingsList = ({ colCount, buildings }) =>
    buildings.map(building => (
        <BuildingsListItemContainer
            key={building.id}
            colCount={colCount}
            building={building}
        />
    ));
export default BuildingsList;
