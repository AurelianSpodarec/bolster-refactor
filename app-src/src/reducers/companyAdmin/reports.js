import { combineReducers } from 'redux';
import uuid from 'uuid/v1';

import {
    POST_REPORT_REQUEST,
    POST_REPORT_SUCCESS,
    POST_REPORT_FAILURE,
    POST_CUSTOM_FILTERS_REQUEST,
    POST_CUSTOM_FILTERS_SUCCESS,
    POST_CUSTOM_FILTERS_FAILURE,
    UPDATE_REPORT_FILTER,
    UPDATE_FILTER_QUESTION_FIELD,
    UPDATE_FILTER_QUESTION_FIELDS,
    UPDATE_OPERATIVE_FILTER
} from 'constants/actionTypes/reports';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    filters: filtersReducer,
    error: errorReducer,
    customFilters: customFiltersReducer,
    postSuccess: postSuccessReducer,
    postFailure: postFailureReducer
});

//send the questionsIDs

//send question values/fields
//these will have the questionID attached to them
//so we can filter on post to create postBody

function filtersReducer(
    state = {
        siteID: 0,
        buildingID: 0,
        floorID: 0,
        drawingID: 0,
        serviceID: 0,
        hierarchyType: '',
        hierarchyID: 0,
        statusID: 0,
        numberOfHistoriesID: 1,
        sortByID: 0,
        reportFormatID: 1,
        includeLocationDrawing: false,
        startDate: undefined,
        endDate: undefined,
        operativeIDs: []
    },
    action
) {
    switch (action.type) {
        case UPDATE_REPORT_FILTER:
            return updateObj(state, action.name, action.value);
        case UPDATE_OPERATIVE_FILTER:
            return updateObj(state, 'operativeIDs', action.value);
        default:
            return state;
    }
}
const initialQuestionFields = {
    name: '',
    questionIDs: [],
    questionValues: [{ text: '', id: uuid() }]
};

function fieldsReducer(state = initialQuestionFields, action) {
    switch (action.type) {
        case UPDATE_FILTER_QUESTION_FIELD:
            return {
                ...state,
                [action.name]: action.value
            };
        case UPDATE_FILTER_QUESTION_FIELD:
            return {
                ...state,
                ...action.fields
            };
        case UPDATE_FILTER_QUESTION_FIELDS:
            return initialQuestionFields;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_REPORT_REQUEST:
            return false;
        case POST_REPORT_SUCCESS:
        case POST_CUSTOM_FILTERS_SUCCESS:
            return true;
        default:
            return state;
    }
}

function customFiltersReducer(state = {}, action) {
    switch (action.type) {
        case POST_CUSTOM_FILTERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_CUSTOM_FILTERS_REQUEST:
        case POST_REPORT_REQUEST:
            return null;
        case POST_CUSTOM_FILTERS_FAILURE:
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
        case POST_CUSTOM_FILTERS_FAILURE:
        case POST_REPORT_FAILURE:
            return true;
        default:
            return state;
    }
}
