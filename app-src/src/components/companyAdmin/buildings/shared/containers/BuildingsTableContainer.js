import React from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';

import BuildingsTable from '../presentational/BuildingsTable';
import { hierarchySort } from 'helpers/generic';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import { selectBuildingFilterStatus } from 'selectors/shared/buildings';

const BuildingsTableContainer = ({
    isFetching,
    error,
    buildings,
    colSpanFirst = false,
    isSorting,
}) => {
    const filters = useSelector(selectBuildingFilterStatus);

    const getFilteredBuildings = () => {
        const { status } = filters;

        if (status === 'active') {
            return buildings.filter(building => !building.isArchived);
        }

        if (status === 'read only') {
            return buildings.filter(
                building => building.accessType === ACCESS_TYPES_VALUES.READONLY,
            );
        }

        if (status === 'archived') {
            return buildings.filter(building => building.isArchived);
        }

        return buildings;
    };

    return (
        <BuildingsTable
            headers={['Building name', 'Created on', 'Permissions', 'Action']}
            isFetching={isFetching}
            error={error}
            items={getFilteredBuildings(buildings)}
            colSpanFirst={colSpanFirst}
            isSorting={isSorting}
        />
    );
};

export default connect(({ companyAdmin: { buildingsReducer, hierarchyReducer } }, ownProps) => ({
    isFetching: buildingsReducer.isFetching,
    error: buildingsReducer.error,
    buildings: ownProps.ids
        .map(id => buildingsReducer.buildings[id])
        .filter(item => item)
        .sort(hierarchySort),
    isSorting: hierarchyReducer.isSorting,
}))(BuildingsTableContainer);
