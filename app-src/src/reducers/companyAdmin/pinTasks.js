import { combineReducers } from 'redux';

import { updateObj, convertArrToObj, removeObjItem } from 'helpers/generic';
import {
    FETCH_PIN_TASKS_REQUEST,
    FETCH_PIN_TASKS_SUCCESS,
    FETCH_PIN_TASKS_FAILURE,
    FETCH_PIN_TASK_REQUEST,
    FETCH_PIN_TASK_SUCCESS,
    FETCH_PIN_TASK_FAILURE,
    CREATE_PIN_TASKS_REQUEST,
    CREATE_PIN_TASKS_SUCCESS,
    CREATE_PIN_TASKS_FAILURE,
    EDIT_PIN_TASK_REQUEST,
    EDIT_PIN_TASK_SUCCESS,
    EDIT_PIN_TASK_FAILURE,
    DELETE_PIN_TASK_REQUEST,
    DELETE_PIN_TASK_SUCCESS,
    DELETE_PIN_TASK_FAILURE,
    FETCH_PIN_TASK_SERIES_MULTIPLE_REQUEST,
    FETCH_PIN_TASK_SERIES_MULTIPLE_SUCCESS,
    FETCH_PIN_TASK_SERIES_MULTIPLE_FAILURE,
    FETCH_PIN_TASK_SERIES_REQUEST,
    FETCH_PIN_TASK_SERIES_SUCCESS,
    FETCH_PIN_TASK_SERIES_FAILURE,
    EDIT_PIN_TASK_SERIES_REQUEST,
    EDIT_PIN_TASK_SERIES_SUCCESS,
    EDIT_PIN_TASK_SERIES_FAILURE,
    DELETE_PIN_TASK_SERIES_REQUEST,
    DELETE_PIN_TASK_SERIES_SUCCESS,
    DELETE_PIN_TASK_SERIES_FAILURE,
} from 'constants/actionTypes/pinTasks';

export default combineReducers({
    pinTasks: pinTasksReducer,
    pinTaskSeries: pinTaskSeriesReducer,
    isFetching: isFetchingReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    error: errorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_PIN_TASKS_REQUEST:
            return true;
        case FETCH_PIN_TASKS_FAILURE:
            return false;
        case FETCH_PIN_TASKS_SUCCESS:
            return false;

        case FETCH_PIN_TASK_REQUEST:
            return true;
        case FETCH_PIN_TASK_FAILURE:
            return false;
        case FETCH_PIN_TASK_SUCCESS:
            return false;

        case FETCH_PIN_TASK_SERIES_MULTIPLE_REQUEST:
            return true;
        case FETCH_PIN_TASK_SERIES_MULTIPLE_FAILURE:
            return false;
        case FETCH_PIN_TASK_SERIES_MULTIPLE_SUCCESS:
            return false;

        case FETCH_PIN_TASK_SERIES_REQUEST:
            return true;
        case FETCH_PIN_TASK_SERIES_FAILURE:
            return false;
        case FETCH_PIN_TASK_SERIES_SUCCESS:
            return false;

        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_TASKS_REQUEST:
            return true;
        case CREATE_PIN_TASKS_FAILURE:
            return false;
        case CREATE_PIN_TASKS_SUCCESS:
            return false;

        case EDIT_PIN_TASK_REQUEST:
            return true;
        case EDIT_PIN_TASK_FAILURE:
            return false;
        case EDIT_PIN_TASK_SUCCESS:
            return false;

        case EDIT_PIN_TASK_SERIES_REQUEST:
            return true;
        case EDIT_PIN_TASK_SERIES_FAILURE:
            return false;
        case EDIT_PIN_TASK_SERIES_SUCCESS:
            return false;

        case DELETE_PIN_TASK_REQUEST:
            return true;
        case DELETE_PIN_TASK_FAILURE:
            return false;
        case DELETE_PIN_TASK_SUCCESS:
            return false;

        case DELETE_PIN_TASK_SERIES_REQUEST:
            return true;
        case DELETE_PIN_TASK_SERIES_FAILURE:
            return false;
        case DELETE_PIN_TASK_SERIES_SUCCESS:
            return false;

        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case FETCH_PIN_TASKS_FAILURE:
            return action.error;
        case FETCH_PIN_TASKS_REQUEST:
            return null;

        case FETCH_PIN_TASK_FAILURE:
            return action.error;
        case FETCH_PIN_TASK_REQUEST:
            return null;

        case CREATE_PIN_TASKS_FAILURE:
            return action.error;
        case CREATE_PIN_TASKS_REQUEST:
            return null;

        case EDIT_PIN_TASK_FAILURE:
            return action.error;
        case EDIT_PIN_TASK_REQUEST:
            return null;

        case DELETE_PIN_TASK_FAILURE:
            return action.error;
        case DELETE_PIN_TASK_REQUEST:
            return null;

        case FETCH_PIN_TASK_SERIES_MULTIPLE_FAILURE:
            return action.error;
        case FETCH_PIN_TASK_SERIES_MULTIPLE_REQUEST:
            return null;

        case FETCH_PIN_TASK_SERIES_FAILURE:
            return action.error;
        case FETCH_PIN_TASK_SERIES_REQUEST:
            return null;

        case EDIT_PIN_TASK_SERIES_FAILURE:
            return action.error;
        case EDIT_PIN_TASK_SERIES_REQUEST:
            return null;

        case DELETE_PIN_TASK_SERIES_FAILURE:
            return action.error;
        case DELETE_PIN_TASK_SERIES_REQUEST:
            return null;

        default:
            return state;
    }
}

function pinTasksReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TASKS_SUCCESS:
            return convertArrToObj(action.payload);

        case FETCH_PIN_TASK_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);

        case EDIT_PIN_TASK_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);

        case DELETE_PIN_TASK_SUCCESS:
            return removeObjItem(state, action.payload);

        default:
            return state;
    }
}

function pinTaskSeriesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TASK_SERIES_MULTIPLE_SUCCESS:
            return convertArrToObj(action.payload);

        case FETCH_PIN_TASK_SERIES_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);

        case EDIT_PIN_TASK_SERIES_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);

        case DELETE_PIN_TASK_SERIES_SUCCESS:
            return removeObjItem(state, action.payload);

        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_PIN_TASKS_SUCCESS:
            return true;
        case CREATE_PIN_TASKS_REQUEST:
            return false;

        case EDIT_PIN_TASK_SUCCESS:
            return true;
        case EDIT_PIN_TASK_REQUEST:
            return false;

        case EDIT_PIN_TASK_SERIES_SUCCESS:
            return true;
        case EDIT_PIN_TASK_SERIES_REQUEST:
            return false;

        case DELETE_PIN_TASK_SUCCESS:
            return true;
        case DELETE_PIN_TASK_REQUEST:
            return false;

        case DELETE_PIN_TASK_SERIES_SUCCESS:
            return true;
        case DELETE_PIN_TASK_SERIES_REQUEST:
            return false;

        default:
            return state;
    }
}
