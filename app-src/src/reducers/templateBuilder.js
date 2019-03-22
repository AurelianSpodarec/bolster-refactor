import { combineReducers } from 'redux';

import { updateObj } from 'helpers/generic';
import { ADD_SECTION } from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_SECTION:
            return updateObj(state, action.section.uuid, action.section);
        default:
            return state;
    }
}
