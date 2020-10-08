import { combineReducers } from 'redux';

import {
    ADMIN_FETCH_DRAWINGS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_DRAWINGS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_DRAWINGS_FOR_COMPANY_FAILURE,
    ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS,
} from 'constants/actionTypes/companies';

import { ADMIN_MOVE_DRAWING_SUCCESS } from 'constants/actionTypes/moveTool';

import { convertArrToObj, removeObjItem, updateObj } from 'helpers/generic';

export default combineReducers({
    drawings: drawingsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer,
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
            return convertArrToObj(action.payload);
        case ADMIN_MOVE_DRAWING_SUCCESS:
            return removeObjItem(state, action.drawingID);
        case ADMIN_EDIT_DRAWING_EXIPIRATION_DATE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
