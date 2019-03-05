import {
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS,
    FETCH_MESSAGES_FAILURE
} from 'constants/actionTypes/messages';

const initialState = {
    messages: [],
    messagesLength: 0,
    isFetching: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {
                ...state,
                isFetching: true,
                error: null
            };
        case FETCH_MESSAGES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                messages: action.payload,
                messagesLength: action.payload.length
            };
        case FETCH_MESSAGES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
