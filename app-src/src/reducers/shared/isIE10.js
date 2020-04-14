import { combineReducers } from "redux";

import { SET_IS_IE10 } from "constants/actionTypes/generic";

export default combineReducers({
    isIE10: checkIfIE10Reducer
});

function checkIfIE10Reducer(state = false, action) {
    switch (action.type) {
        case SET_IS_IE10:
            return action.isIE10;
        default:
            return state;
    }
}
