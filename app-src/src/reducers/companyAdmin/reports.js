import { combineReducers } from 'redux';

import {
    POST_REPORT_REQUEST,
    POST_REPORT_SUCCESS,
    POST_REPORT_FAILURE,
    POST_CUSTOM_FILTERS_REQUEST,
    POST_CUSTOM_FILTERS_SUCCESS,
    POST_CUSTOM_FILTERS_FAILURE,
    UPDATE_REPORT_FILTER,
    UPDATE_FILTER_QUESTION_FIELD,
    REMOVE_FILTER_QUESTION,
    ADD_FILTER_QUESTION,
    REMOVE_FILTER_QUESTIONS,
    UPDATE_FILTER_OPTION,
    UPDATE_SELECTED_PINS
} from 'constants/actionTypes/reports';
import { updateObj, removeObjItem, convertArrToObj } from 'helpers/generic';
import { SORT_BY_OPTIONS, LAYOUT_OPTIONS } from 'constants/companyAdmin/enums';

export default combineReducers({
    customFilters: customFiltersReducer,
    error: errorReducer,
    fields: fieldsReducer,
    filters: filtersReducer,
    options: optionsReducer,
    postFailure: postFailureReducer,
    postSuccess: postSuccessReducer,
    pinResults: pinResultsReducer,
    selectedPins: selectedPinsReducer
});

//send the questionsIDs

//send question values/fields
//these will have the questionID attached to them
//so we can filter on post to create postBody

function filtersReducer(
    state = {
        siteID: '',
        buildingID: '',
        floorID: '',
        drawingID: '',
        serviceID: '',
        hierarchyType: '',
        hierarchyID: '',
        statusID: '',
        numberOfHistoriesID: 1,
        sortByID: '',
        reportFormatID: 1,
        includeLocationDrawing: false,
        startDate: undefined,
        endDate: undefined,
        operativeIDs: [],
        pinIDs: []
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

function fieldsReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_FILTER_QUESTION_FIELD:
            return {
                ...state,
                [action.name]: action.value
            };
        case REMOVE_FILTER_QUESTION:
            return removeObjItem(state, action.id);
        case ADD_FILTER_QUESTION:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    selectedQuestions: [],
                    questionValues: {}
                }
            };
        case REMOVE_FILTER_QUESTIONS:
            return {};
        default:
            return state;
    }
}

function selectedPinsReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_SELECTED_PINS:
            return action.pins;
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

function customFiltersReducer(state = { operatives: [] }, action) {
    switch (action.type) {
        case POST_CUSTOM_FILTERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function pinResultsReducer(state = {}, action) {
    switch (action.type) {
        case POST_CUSTOM_FILTERS_SUCCESS:
            return convertArrToObj(action.payload.pins);
        default:
            return state;
    }
}

function optionsReducer(
    state = {
        showHidden: false,
        sortBy: String(SORT_BY_OPTIONS.CREATED_ON_DESC),
        layout: String(LAYOUT_OPTIONS.ONE_COLUMN)
    },
    action
) {
    switch (action.type) {
        case UPDATE_FILTER_OPTION:
            return updateObj(state, action.key, action.value);
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
