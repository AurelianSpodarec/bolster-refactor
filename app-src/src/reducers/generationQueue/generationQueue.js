import {
    FETCH_GENERATION_QUEUE_REQUEST,
    FETCH_GENERATION_QUEUE_SUCCESS,
    FETCH_GENERATION_QUEUE_FAILURE
} from 'constants/actionTypes/generationQueue';

const initialState = {
    generationQueue: [],
    generationQueueLength: 0,
    isFetching: false,
    success: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GENERATION_QUEUE_REQUEST:
            return {
                ...state,
                isFetching: true,
                success: false,
                error: null
            };
        case FETCH_GENERATION_QUEUE_SUCCESS:
            return {
                ...state,
                isFetching: false,
                success: true,
                generationQueue: action.payload,
                generationQueueLength: action.payload.filter(
                    queue => queue.status === 'Pending'
                ).length
            };
        case FETCH_GENERATION_QUEUE_FAILURE:
            return {
                ...state,
                success: false,
                error: action.error.message
            };
        default:
            return state;
    }
};
