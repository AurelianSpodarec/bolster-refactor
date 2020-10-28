import { combineReducers } from 'redux';
import { SET_IS_SORTING, TOGGLE_IS_SORTING } from 'constants/actionTypes/generic';

export default combineReducers({
    isSorting: isSortingReducer,
});

function isSortingReducer(state = false, action) {
    switch (action.type) {
        case SET_IS_SORTING:
            return action.isSorting;
        case TOGGLE_IS_SORTING:
            return !state;
        default:
            return state;
    }
}
