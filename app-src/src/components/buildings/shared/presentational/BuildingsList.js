import React from 'react';

import BuildingsListItemContainer from '../containers/BuildingsListItemContainer';

const BuildingsList = ({ buildings }) =>
    buildings.map(building => (
        <BuildingsListItemContainer key={building.id} building={building} />
    ));
export default BuildingsList;
