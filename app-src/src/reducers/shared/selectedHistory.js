import { combineReducers } from 'redux';

import { SELECT_PIN_HISTORY } from 'constants/actionTypes/pins';

export default combineReducers({
    selectedHistoryId: selectedHistoryReducer
});

function selectedHistoryReducer(state = 0, action) {
    switch (action.type) {
        case SELECT_PIN_HISTORY:
            return action.id;
        default:
            return state;
    }
}
