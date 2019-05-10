import { combineReducers } from 'redux';

import { convertArrToObj, updateObj, removeObjItem } from 'helpers/generic';
import {} from 'constants/actionTypes/dropdownOptions';

import {} from 'constants/actionTypes/drawings';
import { DROPDOWN_OPTIONS } from 'constants/companyAdmin/enums';

export default combineReducers({
    dropdownOptions: dropdownOptionsReducer,
    isFetching: isFetchingReducer,
    error: errorReducer
});

function isFetchingReducer(state = false, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function errorReducer(state = null, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function dropdownOptionsReducer(state = [], action) {
    switch (action.type) {
        default:
            return state;
    }
}
