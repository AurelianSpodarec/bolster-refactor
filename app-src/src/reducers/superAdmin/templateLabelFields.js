import { combineReducers } from 'redux';

import { convertArrToObj } from 'helpers/generic';
import {
    FETCH_TEMPLATE_SUCCESS,
    SET_LABEL_FIELDS,
    POST_TEMPLATE_SUCCESS,
    FETCH_TEMPLATE_FOR_COMPANY_SUCCESS
} from 'constants/actionTypes/templateBuilder';

export default combineReducers({
    labelFields: labelFieldsReducer
});

function labelFieldsReducer(state = {}, action) {
    switch (action.type) {
        case FETCH_TEMPLATE_SUCCESS:
        case FETCH_TEMPLATE_FOR_COMPANY_SUCCESS:
        case SET_LABEL_FIELDS: {
            const newList = Object.values(state).filter(
                field => field.templateUUID !== action.templateUUID
            );
            return {
                ...convertArrToObj(newList, 'uuid'),
                ...convertArrToObj(action.labelFields, 'uuid')
            };
        }
        case POST_TEMPLATE_SUCCESS: {
            const newList = Object.values(state).filter(
                field => field.templateUUID !== action.oldUUID
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
