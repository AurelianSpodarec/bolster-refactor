import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';

export default combineReducers({
    questions: questionsReducer
});

function questionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
            return convertArrToObj(action.payload.questions);
        default:
            return state;
    }
}
