import { combineReducers } from 'redux';

import { updateObj, removeObjItem, convertArrToObj } from 'helpers/generic';
import {
    SET_SECTION,
    DELETE_SECTION,
    POST_TEMPLATE_SUCCESS
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case SET_SECTION:
            return updateObj(state, action.section.uuid, action.section);
        case DELETE_SECTION:
            return removeObjItem(state, action.uuid);
        case POST_TEMPLATE_SUCCESS: {
            const filteredSections = Object.values(state).filter(
                sec => sec.templateUUID !== action.oldUUID
            );
            return {
                ...convertArrToObj(filteredSections, 'uuid'),
                ...convertArrToObj(action.sections, 'uuid')
            };
        }
        default:
            return state;
    }
}
