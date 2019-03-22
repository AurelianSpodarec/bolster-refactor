import { combineReducers } from 'redux';
import {
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILURE
} from 'constants/actionTypes/services';
import { updateObj } from 'helpers/generic';

export default combineReducers({
    postSuccessReducer,
    errorReducer,
    updatedServiceIDReducer
});

function postSuccessReducer(state = false, action) {
    switch (action.type) {
        case CREATE_SERVICE_REQUEST:
            return false;
        case CREATE_SERVICE_SUCCESS:
            return true;
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        case CREATE_SERVICE_REQUEST:
            return null;
        case CREATE_SERVICE_FAILURE:
            return action.error;
        default:
            return state;
    }
}

function updatedServiceIDReducer(state = 0, action) {
    switch (action.type) {
        case CREATE_SERVICE_SUCCESS:
            return updateObj(state, action.payload.id, action.payload);
        default:
            return state;
    }
}
