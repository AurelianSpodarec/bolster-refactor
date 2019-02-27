import {
    ADD_FIELD_ERROR,
    REMOVE_FIELD_ERROR,
    CLEAR_FIELD_ERRORS
} from 'constants/actionTypes/generic';

export default (state = {}, action) => {
    switch (action.type) {
        case ADD_FIELD_ERROR:
            return {
                ...state,
                [action.fieldName]: action.error
            };
        case REMOVE_FIELD_ERROR: {
            const { [action.fieldName]: removed, ...rest } = state; // eslint-disable-line

            return {
                ...rest
            };
        }
        case CLEAR_FIELD_ERRORS:
            return {};
        default:
            return state;
    }
};
