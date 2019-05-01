import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import { FETCH_TEMPLATE_SUCCESS } from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    sections: sectionsReducer
});

function sectionsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TEMPLATE_SUCCESS:
            return { ...state, ...convertArrToObj(action.labelFields, 'uuid') };

        default:
            return state;
    }
}
