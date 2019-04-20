import { combineReducers } from 'redux';

import { UPDATE_REPORT_FILTER } from 'constants/actionTypes/reports';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    filters: filtersReducer
});

function filtersReducer(
    state = {
        siteID: 0,
        buildingID: 0,
        floorID: 0,
        drawingID: 0,
        serviceID: 0,
        statusID: 0,
        startDate: undefined,
        endDate: undefined,
        oprativeIDs: []
    },
    action
) {
    switch (action.type) {
        case UPDATE_REPORT_FILTER:
            return updateObj(state, action.name, action.value);
        default:
            return state;
    }
}
