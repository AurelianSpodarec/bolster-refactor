import { combineReducers } from 'redux';
import { SET_HIDE_FRONT_END_HEADER } from 'constants/actionTypes/generic';
import { updateObj } from 'helpers/generic';

export default combineReducers({ layout: layoutReducer });

function layoutReducer(state = { hideHeader: false }, action) {
    switch (action.type) {
        case SET_HIDE_FRONT_END_HEADER:
            return updateObj(state, 'hideHeader', action.hidden);
        default:
            return state;
    }
}
