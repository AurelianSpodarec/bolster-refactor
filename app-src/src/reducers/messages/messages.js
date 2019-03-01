import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';

const initialState = {
    messages: [],
    messagesLength: 0,
    isFetching: false,
    success: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {
                ...state,
                isFetching: true,
                success: false,
                error: null
            };
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                success: true,
                messages: action.payload,
                messagesLength: action.payload.length
            };
        case FETCH_MESSAGES_FAILURE:
            return {
                ...state,
                success: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
