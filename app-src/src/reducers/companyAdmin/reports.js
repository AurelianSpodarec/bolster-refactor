import { combineReducers } from 'redux';

import {
    POST_REPORT_REQUEST,
    POST_REPORT_SUCCESS,
    POST_REPORT_FAILURE,
    UPDATE_REPORT_FILTER
} from 'constants/actionTypes/reports';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    filters: filtersReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer
});

function filtersReducer(
    state = {
        siteID: 0,
        buildingID: 0,
        floorID: 0,
        drawingID: 0,
        serviceID: 0,
        statusID: 0,
        numberOfHistoriesID: 0,
        sortByID: 0,
        reportFormatID: 0,
        includeLocationDrawing: false,
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

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_REPORT_REQUEST:
            return false;
        case POST_REPORT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_REPORT_REQUEST:
            return null;
        case POST_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postFailureReducer(state = false, action) {
    switch (action.type) {
        case POST_REPORT_REQUEST:
            return false;
        case POST_REPORT_FAILURE:
            return true;
        default:
            return state;
    }
}
