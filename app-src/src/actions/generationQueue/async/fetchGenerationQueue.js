import axios from 'axios';

import {
    FETCH_GENERATION_QUEUE_REQUEST,
    FETCH_GENERATION_QUEUE_SUCCESS,
    FETCH_GENERATION_QUEUE_FAILURE
} from 'constants/actionTypes/generationQueue';

export const fetchGenerationQueueRequest = () => ({
    type: FETCH_GENERATION_QUEUE_REQUEST
});

export const fetchGenerationQueueSuccess = payload => ({
    type: FETCH_GENERATION_QUEUE_SUCCESS,
    payload
});

export const fetchGenerationQueueFailure = error => ({
    type: FETCH_GENERATION_QUEUE_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchGenerationQueueRequest());

    axios
        .get('/mockData/generationQueue/generationQueue.json')
        .then(res => dispatch(fetchGenerationQueueSuccess(res.data)))
        .catch(err => dispatch(fetchGenerationQueueFailure(err.message)));
};
