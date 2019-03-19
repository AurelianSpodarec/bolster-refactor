import { combineReducers } from 'redux';

import { updateObj, removeObjItem } from 'helpers/generic';
import {
    ADD_FIELD_ERROR,
    REMOVE_FIELD_ERROR,
    CLEAR_FIELD_ERRORS,
    SHOW_FIELD_ERRORS,
    SET_API_FIELD_ERRORS
} from 'constants/actionTypes/generic';

export default combineReducers({
    fieldErrors: fieldErrorsReducer,
    errorsVisible: errorsVisibleReducer
});

function fieldErrorsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_FIELD_ERROR:
            return updateObj(state, action.fieldName, action.error);
        case REMOVE_FIELD_ERROR:
            return removeObjItem(state, action.fieldName);
        case SET_API_FIELD_ERRORS:
            return action.fieldErrors;
        case CLEAR_FIELD_ERRORS:
            return {};
        default:
            return state;
    }
}

function errorsVisibleReducer(state = false, action) {
    switch (action.type) {
        case SHOW_FIELD_ERRORS:
            return true;
        case SET_API_FIELD_ERRORS:
            return action.errorsVisible;
        default:
            return state;
    }
}
