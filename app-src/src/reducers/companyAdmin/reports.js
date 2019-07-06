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
    UPDATE_SELECTED_PINS,
    RESET_FILTER_OPTIONS,
    POST_REPORT_NO_PINS,
    UPDATE_FILTER_QUESTION_VALS,
    ADD_RECTANGLE,
    REMOVE_RECTANGLE,
    UPDATE_FURTHER_FILTRATION_OPTION,
    REMOVE_ALL_RECTANGLES,
    UPDATE_IS_PIN_EXCLUDED,
    REMOVE_ALL_EXCLUDED_PINS
} from 'constants/actionTypes/reports';
import { updateObj, removeObjItem, convertArrToObj } from 'helpers/generic';
import { SORT_BY_OPTIONS } from 'constants/companyAdmin/enums';
import { FETCH_PINS_SUCCESS } from 'constants/actionTypes/pins';

export default combineReducers({
    customFilters: customFiltersReducer,
    error: errorReducer,
    fields: fieldsReducer,
    filters: filtersReducer,
    options: optionsReducer,
    postSuccess: postSuccessReducer,
    pinResults: pinResultsReducer,
    selectedPins: selectedPinsReducer,
    isFetching: isFetchingReducer,
    rectangles: rectanglesReducer,
    furtherFiltrationOption: furtherFiltrationOptionReducer,
    excludedPinIDs: excludedPinIDsReducer
});

//send the questionsIDs

//send question values/fields
//these will have the questionID attached to them
//so we can filter on post to create postBody

function filtersReducer(
    state = {
        siteID: null,
        buildingID: null,
        floorID: null,
        drawingID: null,
        serviceID: null,
        templateID: null,
        hierarchyType: null,
        hierarchyID: null,
        status: null,
        reportHistories: 1,
        sortByID: null,
        includePinLocation: false,
        includeFloorplan: false,
        isPDFGeneration: false,
        isCSVGeneration: false,
        isFloorplanGeneration: false,
        fromDateInclusive: undefined,
        toDateInclusive: undefined,
        companyUserIDs: [],
        pinIDs: [],
        floorplanPinScale: 1
    },
    action
) {
    switch (action.type) {
        case UPDATE_REPORT_FILTER:
            return updateObj(state, action.name, action.value);
        case RESET_FILTER_OPTIONS:
            // reset to base state
            return {
                siteID: null,
                buildingID: null,
                floorID: null,
                drawingID: null,
                serviceID: null,
                templateID: null,
                hierarchyType: null,
                hierarchyID: null,
                status: null,
                reportHistories: 1,
                sortByID: null,
                includePinLocation: false,
                includeFloorplan: false,
                isPDFGeneration: false,
                isCSVGeneration: false,
                isFloorplanGeneration: false,
                fromDateInclusive: undefined,
                toDateInclusive: undefined,
                companyUserIDs: [],
                pinIDs: [],
                floorplanPinScale: 1
            };
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
                    questionValues: [],
                    selectedValues: []
                }
            };
        case UPDATE_FILTER_QUESTION_VALS:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    selectedValues: action.selected
                }
            };
        case REMOVE_FILTER_QUESTIONS:
        case RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}

function selectedPinsReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_SELECTED_PINS:
            return action.pins;
        case RESET_FILTER_OPTIONS:
            return {};
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

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case POST_CUSTOM_FILTERS_REQUEST:
            return true;
        case POST_CUSTOM_FILTERS_SUCCESS:
        case POST_CUSTOM_FILTERS_FAILURE:
            return false;
        default:
            return state;
    }
}

function customFiltersReducer(
    state = { operatives: [], pins: [], questions: [] },
    action
) {
    switch (action.type) {
        case FETCH_PINS_SUCCESS:
            return { ...state, pins: action.payload };
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
        sortBy: String(SORT_BY_OPTIONS.PIN_NO_ASC)
    },
    action
) {
    switch (action.type) {
        case UPDATE_FILTER_OPTION:
            return updateObj(state, action.key, action.value);
        case RESET_FILTER_OPTIONS:
            return {
                showHidden: false,
                sortBy: String(SORT_BY_OPTIONS.PIN_NO_ASC)
            };
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_CUSTOM_FILTERS_REQUEST:
        case POST_REPORT_REQUEST:
            return null;
        case POST_REPORT_NO_PINS:
            return action.payload;
        case POST_CUSTOM_FILTERS_FAILURE:
        case POST_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function rectanglesReducer(state = {}, action) {
    switch (action.type) {
        case ADD_RECTANGLE:
            return updateObj(state, action.id, {
                id: action.id,
                corners: [action.topLeft, action.bottomRight]
            });
        case REMOVE_RECTANGLE:
            return removeObjItem(state, action.id);
        case REMOVE_ALL_RECTANGLES:
        case RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}

function furtherFiltrationOptionReducer(state = 0, action) {
    switch (action.type) {
        case UPDATE_FURTHER_FILTRATION_OPTION:
            return action.value;
        case RESET_FILTER_OPTIONS:
            return 0;
        default:
            return state;
    }
}

function excludedPinIDsReducer(state = {}, action) {
    switch (action.type) {
        case UPDATE_IS_PIN_EXCLUDED:
            return action.isExcluded
                ? updateObj(state, action.id, action.id)
                : removeObjItem(state, action.id);
        case REMOVE_ALL_EXCLUDED_PINS:
        case RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}
