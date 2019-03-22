import { combineReducers } from 'redux';

import { updateObj, removeObjItem } from 'helpers/generic';
import {
    ADD_SECTION,
    DELETE_SECTION
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case ADD_SECTION:
            return updateObj(state, action.section.uuid, action.section);

        case DELETE_SECTION:
            return removeObjItem(state, action.uuid);
        default:
            return state;
    }
}
