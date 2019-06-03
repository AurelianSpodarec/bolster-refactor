import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_TEMPLATE_SUCCESS,
    SET_STATUS_OPTIONS,
    POST_TEMPLATE_SUCCESS
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    labelFields: labelFieldsReducer
});

function labelFieldsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TEMPLATE_SUCCESS:
        case SET_STATUS_OPTIONS: {
            const newList = Object.values(state).filter(
                field => field.templateUUID !== action.templateUUID
            );
            return {
                ...convertArrToObj(newList, 'uuid'),
                ...convertArrToObj(action.statusOptions, 'uuid')
            };
        }
        case POST_TEMPLATE_SUCCESS: {
            const newList = Object.values(state).filter(
                field => field.templateUUID !== action.oldUUID
            );
            return {
                ...convertArrToObj(newList, 'uuid'),
                ...convertArrToObj(action.statusOptions, 'uuid')
            };
        }
        default:
            return state;
    }
}
