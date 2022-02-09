import React from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

import FloorTable from '../presentational/FloorTable';
import { hierarchySort } from 'helpers/generic';
import { selectFloorsFilterStatus } from 'selectors/shared/floors';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';

const FloorTableContainer = ({ isFetching, error, floors, colSpanFirst = false, isSorting }) => {
    const filters = useSelector(selectFloorsFilterStatus);

    const getFilteredBuildings = () => {
        const { status } = filters;

        if (status === 'active') {
            return floors.filter(site => !site.isArchived);
        }

        if (status === 'read only') {
            return floors.filter(site => site.accessType === ACCESS_TYPES_VALUES.READONLY);
        }

        if (status === 'archived') {
            return floors.filter(site => site.isArchived);
        }

        return floors;
    };
    return (
        <FloorTable
            headers={['Floor name', 'Created on', 'Permissions', 'Action']}
            isFetching={isFetching}
            error={error}
            floors={getFilteredBuildings(floors)}
            colSpanFirst={colSpanFirst}
            isSorting={isSorting}
        />
    );
};

export default connect(({ companyAdmin: { floorsReducer, hierarchyReducer } }, ownProps) => ({
    isFetching: floorsReducer.isFetching,
    error: floorsReducer.error,
    floors: ownProps.ids
        .map(id => floorsReducer.floors[id])
        .filter(item => item)
        .sort(hierarchySort),
    isSorting: hierarchyReducer.isSorting,
}))(FloorTableContainer);
