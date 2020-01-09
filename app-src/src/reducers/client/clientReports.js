import { combineReducers } from 'redux';

import {
    CLIENT_POST_REPORT_REQUEST,
    CLIENT_POST_REPORT_SUCCESS,
    CLIENT_POST_REPORT_FAILURE,
    CLIENT_POST_CUSTOM_FILTERS_REQUEST,
    CLIENT_POST_CUSTOM_FILTERS_SUCCESS,
    CLIENT_POST_CUSTOM_FILTERS_FAILURE,
    CLIENT_UPDATE_REPORT_FILTER,
    CLIENT_UPDATE_FILTER_QUESTION_FIELD,
    CLIENT_REMOVE_FILTER_QUESTION,
    CLIENT_ADD_FILTER_QUESTION,
    CLIENT_REMOVE_FILTER_QUESTIONS,
    CLIENT_UPDATE_FILTER_OPTION,
    CLIENT_UPDATE_SELECTED_PINS,
    CLIENT_RESET_FILTER_OPTIONS,
    CLIENT_POST_REPORT_NO_PINS,
    CLIENT_ADD_RECTANGLE,
    CLIENT_REMOVE_RECTANGLE,
    CLIENT_REMOVE_ALL_RECTANGLES,
    CLIENT_UPDATE_FURTHER_FILTRATION_OPTION,
    CLIENT_UPDATE_IS_PIN_EXCLUDED,
    CLIENT_REMOVE_ALL_EXCLUDED_PINS
} from 'constants/client/actionTypes/clientReports';
import { updateObj, removeObjItem, convertArrToObj } from 'helpers/generic';
import { SORT_BY_OPTIONS } from 'constants/companyAdmin/enums';
import { RESET_FILTER_OPTIONS } from 'constants/actionTypes/reports';
import { CLIENT_FETCH_PINS_SUCCESS } from 'constants/client/actionTypes/clientPins';

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
        siteID: '',
        buildingID: '',
        floorID: '',
        drawingID: '',
        serviceID: '',
        hierarchyType: '',
        hierarchyID: '',
        status: '',
        reportHistories: 1,
        sortByID: '',
        includePinLocation: false,
        isPDFGeneration: false,
        isCSVGeneration: false,
        isFloorplanGeneration: false,
        includeFloorplan: false,
        fromDateInclusive: undefined,
        toDateInclusive: undefined,
        companyUserIDs: [],
        pinIDs: [],
        floorplanPinScale: 0.5
    },
    action
) {
    switch (action.type) {
        case CLIENT_UPDATE_REPORT_FILTER:
            return updateObj(state, action.name, action.value);
        case CLIENT_RESET_FILTER_OPTIONS:
            // reset to base state
            return {
                siteID: '',
                buildingID: '',
                floorID: '',
                drawingID: '',
                serviceID: '',
                hierarchyType: '',
                hierarchyID: '',
                status: '',
                reportHistories: 1,
                sortByID: '',
                includePinLocation: false,
                includeFloorplan: false,
                isPDFGeneration: false,
                isCSVGeneration: false,
                isFloorplanGeneration: false,
                fromDateInclusive: undefined,
                toDateInclusive: undefined,
                companyUserIDs: [],
                pinIDs: [],
                floorplanPinScale: 0.5
            };
        default:
            return state;
    }
}

function fieldsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_UPDATE_FILTER_QUESTION_FIELD:
            return {
                ...state,
                [action.name]: action.value
            };
        case CLIENT_REMOVE_FILTER_QUESTION:
            return removeObjItem(state, action.id);
        case CLIENT_ADD_FILTER_QUESTION:
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    selectedQuestions: [],
                    questionValues: [],
                    selectedValues: []
                }
            };
        case CLIENT_REMOVE_FILTER_QUESTIONS:
        case CLIENT_RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}

function selectedPinsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_UPDATE_SELECTED_PINS:
            return action.pins;
        case CLIENT_RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_POST_REPORT_REQUEST:
            return false;
        case CLIENT_POST_REPORT_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case CLIENT_POST_CUSTOM_FILTERS_REQUEST:
            return true;
        case CLIENT_POST_CUSTOM_FILTERS_SUCCESS:
        case CLIENT_POST_CUSTOM_FILTERS_FAILURE:
            return false;
        default:
            return state;
    }
}

function customFiltersReducer(state = { operatives: [], pins: [], questions: [] }, action) {
    switch (action.type) {
        case CLIENT_FETCH_PINS_SUCCESS:
            return { ...state, pins: action.payload };
        case CLIENT_POST_CUSTOM_FILTERS_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

function pinResultsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_POST_CUSTOM_FILTERS_SUCCESS:
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
        case CLIENT_UPDATE_FILTER_OPTION:
            return updateObj(state, action.key, action.value);
        case CLIENT_RESET_FILTER_OPTIONS:
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
        case CLIENT_POST_CUSTOM_FILTERS_REQUEST:
        case CLIENT_POST_REPORT_REQUEST:
            return null;
        case CLIENT_POST_REPORT_NO_PINS:
            return action.payload;
        case CLIENT_POST_CUSTOM_FILTERS_FAILURE:
        case CLIENT_POST_REPORT_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function rectanglesReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_ADD_RECTANGLE:
            return updateObj(state, action.id, {
                id: action.id,
                corners: [action.topLeft, action.bottomRight]
            });
        case CLIENT_REMOVE_RECTANGLE:
            return removeObjItem(state, action.id);
        case CLIENT_REMOVE_ALL_RECTANGLES:
        case CLIENT_RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}

function furtherFiltrationOptionReducer(state = 0, action) {
    switch (action.type) {
        case CLIENT_UPDATE_FURTHER_FILTRATION_OPTION:
            return action.value;
        case RESET_FILTER_OPTIONS:
            return 0;
        default:
            return state;
    }
}

function excludedPinIDsReducer(state = {}, action) {
    switch (action.type) {
        case CLIENT_UPDATE_IS_PIN_EXCLUDED:
            return action.isExcluded
                ? updateObj(state, action.id, action.id)
                : removeObjItem(state, action.id);
        case CLIENT_REMOVE_ALL_EXCLUDED_PINS:
        case RESET_FILTER_OPTIONS:
            return {};
        default:
            return state;
    }
}
