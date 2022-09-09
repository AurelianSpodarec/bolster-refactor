import React from 'react';

import BuildingsListItemContainer from '../containers/BuildingsListItemContainer';

const BuildingsList = ({ colCount, buildings, headers }) =>
    buildings.map(building => (
        <BuildingsListItemContainer
            key={building.id}
            colCount={colCount}
            building={building}
            headers={headers}
        />
    ));
export default BuildingsList;
