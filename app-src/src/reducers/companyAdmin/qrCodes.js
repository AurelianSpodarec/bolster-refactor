import { combineReducers } from 'redux';

import {
    GENERATE_QR_CODES_REQUEST,
    GENERATE_QR_CODES_SUCCESS,
    GENERATE_QR_CODES_FAILURE
} from 'constants/actionTypes/qrCodes';

export default combineReducers({
    isGenerating: isGeneratingReducer,
    generateSuccess: generateSuccessReducer,
    generateError: generateErrorReducer
});

function isGeneratingReducer(state = false, action) {
    switch (action.type) {
        case GENERATE_QR_CODES_REQUEST:
            return true;
        case GENERATE_QR_CODES_SUCCESS:
        case GENERATE_QR_CODES_FAILURE:
            return false;
        default:
            return state;
    }
}

function generateSuccessReducer(state = false, action) {
    switch (action.type) {
        case GENERATE_QR_CODES_REQUEST:
            return false;
        case GENERATE_QR_CODES_SUCCESS:
            return true;
        default:
            return state;
    }
}

function generateErrorReducer(state = null, action) {
    switch (action.type) {
        case GENERATE_QR_CODES_REQUEST:
            return null;
        case GENERATE_QR_CODES_FAILURE:
            return action.error;
        default:
            return state;
    }
}