import React from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

import DrawingTable from '../presentational/DrawingTable';
import { hierarchySort } from 'helpers/generic';
import { ACCESS_TYPES_VALUES } from 'constants/companyAdmin/enums';
import { selectDrawingsFilterStatus } from 'selectors/shared/drawings';

const DrawingTableContainer = ({
    isFetching,
    error,
    drawings,
    colSpanFirst = false,
    isSorting,
}) => {
    const filters = useSelector(selectDrawingsFilterStatus);

    const getFilteredDrawings = () => {
        const { status } = filters;

        if (status === 'active') {
            return drawings.filter(site => !site.isArchived);
        }

        if (status === 'read only') {
            return drawings.filter(site => site.accessType === ACCESS_TYPES_VALUES.READONLY);
        }

        if (status === 'archived') {
            return drawings.filter(site => site.isArchived);
        }

        return drawings;
    };

    return (
        <DrawingTable
            headers={[
                'Drawing name',
                'Created on',
                'Last updated',
                'Expires',
                'Permissions',
                'Action',
            ]}
            isFetching={isFetching}
            error={error}
            drawings={getFilteredDrawings(drawings)}
            colSpanFirst={colSpanFirst}
            isSorting={isSorting}
        />
    );
};

export default connect(({ companyAdmin: { drawingsReducer, hierarchyReducer } }, ownProps) => ({
    isFetching: drawingsReducer.isFetching,
    error: drawingsReducer.error,
    drawings: ownProps.ids
        .map(id => drawingsReducer.drawings[id])
        .filter(item => item)
        .sort(hierarchySort),
    isSorting: hierarchyReducer.isSorting,
}))(DrawingTableContainer);
