import { combineReducers } from 'redux';

import { updateObj, removeObjItem, convertArrToObj } from 'helpers/generic';
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
    POST_TEMPLATE_FAILURE,
    FETCH_TEMPLATES_REQUEST,
    FETCH_TEMPLATES_SUCCESS,
    FETCH_TEMPLATES_FAILURE,
    FETCH_TEMPLATE_REQUEST,
    FETCH_TEMPLATE_SUCCESS,
    FETCH_TEMPLATE_FAILURE,
    SET_LABEL_FIELDS,
    FETCH_TEMPLATES_SIMPLE_REQUEST,
    FETCH_TEMPLATES_SIMPLE_SUCCESS,
    FETCH_TEMPLATES_SIMPLE_FAILURE,
    DELETE_TEMPLATE_REQUEST,
    DELETE_TEMPLATE_FAILURE,
    DELETE_TEMPLATE_SUCCESS
} from 'constants/actionTypes/templateBuilder';
import {
    FETCH_COMPANY_TEMPLATES_REQUEST,
    FETCH_COMPANY_TEMPLATES_SUCCESS,
    FETCH_COMPANY_TEMPLATES_FAILURE
} from 'constants/actionTypes/companies';

export default combineReducers({
    templates: templatesReducer,
    saveRequired: saveRequiredReducer,
    error: errorReducer,
    postSuccess: postSuccessReducer,
    isPosting: isPostingReducer,
    updatedTemplateUUID: updatedTemplateUUIDReducer,
    isFetching: isFetchingReducer,
    deleteSuccess: deleteSuccessReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        case FETCH_TEMPLATES_REQUEST:
        case FETCH_TEMPLATE_REQUEST:
        case FETCH_COMPANY_TEMPLATES_REQUEST:
        case FETCH_TEMPLATES_SIMPLE_REQUEST:
            return true;
        case FETCH_TEMPLATES_SUCCESS:
        case FETCH_COMPANY_TEMPLATES_SUCCESS:
        case FETCH_TEMPLATE_SUCCESS:
        case FETCH_TEMPLATES_FAILURE:
        case FETCH_TEMPLATE_FAILURE:
        case FETCH_TEMPLATES_SIMPLE_SUCCESS:
        case FETCH_TEMPLATES_SIMPLE_FAILURE:
            return false;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case POST_TEMPLATE_REQUEST:
        case FETCH_TEMPLATES_REQUEST:
        case FETCH_COMPANY_TEMPLATES_REQUEST:
        case FETCH_TEMPLATE_REQUEST:
        case FETCH_TEMPLATES_SIMPLE_REQUEST:
        case DELETE_TEMPLATE_REQUEST:
            return null;
        case POST_TEMPLATE_FAILURE:
        case FETCH_TEMPLATES_FAILURE:
        case FETCH_COMPANY_TEMPLATES_FAILURE:
        case FETCH_TEMPLATE_FAILURE:
        case FETCH_TEMPLATES_SIMPLE_FAILURE:
        case DELETE_TEMPLATE_FAILURE:
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

function deleteSuccessReducer(state = false, action) {
    switch (action.type) {
        case DELETE_TEMPLATE_REQUEST:
            return false;
        case DELETE_TEMPLATE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function isPostingReducer(state = false, action) {
    switch (action.type) {
        case POST_TEMPLATE_REQUEST:
            return true;
        case POST_TEMPLATE_SUCCESS:
        case POST_TEMPLATE_FAILURE:
            return false;
        default:
            return state;
    }
}

function updatedTemplateUUIDReducer(state = 0, action) {
    switch (action.type) {
        case POST_TEMPLATE_REQUEST:
            return 0;
        case POST_TEMPLATE_SUCCESS:
            return action.template.uuid;
        default:
            return state;
    }
}

function templatesReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TEMPLATES_SUCCESS:
            return {
                ...state,
                ...convertArrToObj(action.payload, 'uuid')
            };
        case FETCH_COMPANY_TEMPLATES_SUCCESS:
            return {
                ...state,
                ...convertArrToObj(action.payload, 'uuid')
            };
        case FETCH_TEMPLATES_SIMPLE_SUCCESS:
            return convertArrToObj(action.payload, 'uuid');
        case FETCH_TEMPLATE_SUCCESS:
        case DELETE_TEMPLATE_SUCCESS:
        case SET_TEMPLATE:
            return updateObj(state, action.template.uuid, action.template);
        case POST_TEMPLATE_SUCCESS:
            return {
                ...removeObjItem(state, action.oldUUID),
                [action.template.uuid]: action.template
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
        case SET_LABEL_FIELDS:
            return true;
        case RESET_SAVE_REQUIRED:
        case POST_TEMPLATE_SUCCESS:
            return false;
        default:
            return state;
    }
}
