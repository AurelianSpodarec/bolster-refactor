import {
    ADD_FIELD_ERROR,
    REMOVE_FIELD_ERROR,
    CLEAR_FIELD_ERRORS,
    SHOW_FIELD_ERRORS
} from 'constants/actionTypes/generic';

const initialState = {
    fieldErrors: {},
    showFieldErrors: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FIELD_ERROR:
            return {
                ...state,
                fieldErrors: {
                    ...state.fieldErrors,
                    [action.fieldName]: action.error
                }
            };
        case REMOVE_FIELD_ERROR: {
            const {
                [action.fieldName]: removedError, // eslint-disable-line
                ...otherErrors
            } = state.fieldErrors;

            return {
                ...state,
                fieldErrors: {
                    ...otherErrors
                }
            };
        }
        case SHOW_FIELD_ERRORS:
            return {
                ...state,
                showFieldErrors: true
            };
        case CLEAR_FIELD_ERRORS:
            return initialState;
        default:
            return state;
    }
};
