import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import {
    SET_TEMPLATE,
    SET_SECTION,
    DELETE_SECTION,
    SET_QUESTION,
    DELETE_QUESTION,
    CHANGE_QUESTION_SECTION,
    SWAP_QUESTION_SORTS,
    RESET_SAVE_REQUIRED
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    templates: templatesReducer,
    saveRequired: saveRequiredReducer
});

function templatesReducer(state = {}, action) {
    switch (action.type) {
        case SET_TEMPLATE:
            return updateObj(state, action.template.uuid, action.template);
        default:
            return state;
    }
}

function saveRequiredReducer(state = false, action) {
    switch (action.type) {
        case SET_TEMPLATE:
        case SET_SECTION:
        case DELETE_SECTION:
        case SET_QUESTION:
        case DELETE_QUESTION:
        case CHANGE_QUESTION_SECTION:
        case SWAP_QUESTION_SORTS:
            return true;
        case RESET_SAVE_REQUIRED:
            return false;
        default:
            return state;
    }
}
