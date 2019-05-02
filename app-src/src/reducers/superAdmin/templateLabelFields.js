import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_TEMPLATE_SUCCESS,
    SET_LABEL_FIELDS
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    labelFields: labelFieldsReducer
});

function labelFieldsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TEMPLATE_SUCCESS:
        case SET_LABEL_FIELDS: {
            const newList = Object.values(state).filter(
                field => field.templateUUID !== action.templateUUID
            );
            return {
                ...convertArrToObj(newList, 'uuid'),
                ...convertArrToObj(action.labelFields, 'uuid')
            };
        }
        default:
            return state;
    }
}
