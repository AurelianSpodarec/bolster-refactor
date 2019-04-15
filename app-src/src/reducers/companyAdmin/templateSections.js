import { combineReducers } from 'redux';

import { FETCH_PIN_TEMPLATES_SUCCESS } from 'constants/actionTypes/pins';
import { FETCH_DRAWING_TEMPLATES_SUCCESS } from 'constants/actionTypes/drawings';
import {
    FETCH_ALL_TEMPLATES_SUCCESS,
    EDIT_TEMPLATE_QUESTION_SUCCESS
} from 'constants/actionTypes/templates';
import { convertArrToObj, updateObj } from 'helpers/generic';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_PIN_TEMPLATES_SUCCESS:
        case FETCH_DRAWING_TEMPLATES_SUCCESS:
        case FETCH_ALL_TEMPLATES_SUCCESS:
            return { ...state, ...convertArrToObj(action.payload.sections) };
        case EDIT_TEMPLATE_QUESTION_SUCCESS:
            // TODO : check
            return updateObj(
                state,
                action.payload.sections.id,
                action.payload.sections
            );
        default:
            return state;
    }
}
