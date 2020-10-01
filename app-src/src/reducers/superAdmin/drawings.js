import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_DRAWINGS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_DRAWINGS_FOR_COMPANY_FAILURE,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE,
} from 'constants/actionTypes/companies';

import { ADMIN_MOVE_DRAWING_SUCCESS } from 'constants/actionTypes/moveTool';

import { convertArrToObj, removeObjItem } from 'helpers/generic';

export default combineReducers({
    drawings: drawingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
    isPosting: isPostingReducer,
    postSuccess: postSuccessReducer,
    postError: postErrorReducer,
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST:
            return true;
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_SUCCESS:
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST:
            return null;
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function drawingsReducer(state = {}, action) {
    switch (action.type) {
        case ADMIN_FETCH_DRAWINGS_FOR_COMPANY_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload) };
        case ADMIN_MOVE_DRAWING_SUCCESS:
            return removeObjItem(state, action.drawingID);
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST:
            return true;
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS:
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE:
            return false;
        default:
            return state;
    }
}

function postErrorReducer(state = null, action) {
    switch (action.type) {
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST:
            return null;
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_REQUEST:
            return false;
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS:
            return true;
        default:
            return state;
    }
}
