import { combineReducers } from 'redux';

import { updateObj, removeObjItem } from 'helpers/generic';
import {
    SET_TEMPLATE,
    SET_SECTION,
    DELETE_SECTION,
    SET_QUESTION,
    DELETE_QUESTION,
    CHANGE_QUESTION_SECTION,
    SWAP_QUESTION_SORTS,
    RESET_SAVE_REQUIRED,
    POST_TEMPLATE_REQUEST,
    POST_TEMPLATE_SUCCESS,
    POST_TEMPLATE_FAILURE
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    templates: templatesReducer,
    saveRequired: saveRequiredReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer
});

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_TEMPLATE_REQUEST:
            return null;
        case POST_TEMPLATE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case POST_TEMPLATE_REQUEST:
            return false;
        case POST_TEMPLATE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function templatesReducer(state = {}, action) {
    switch (action.type) {
        case SET_TEMPLATE:
            return updateObj(state, action.template.uuid, action.template);
        case POST_TEMPLATE_SUCCESS:
            return {
                ...removeObjItem(state, action.oldUuid),
                [action.newTemplate.uuid]: action.newTemplate
            };
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
        case POST_TEMPLATE_SUCCESS:
            return false;
        default:
            return state;
    }
}
