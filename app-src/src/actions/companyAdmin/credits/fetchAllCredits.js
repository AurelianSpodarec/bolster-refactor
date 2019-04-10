import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_CREDITS_REQUEST,
    FETCH_CREDITS_SUCCESS,
    FETCH_CREDITS_FAILURE
} from 'constants/actionTypes/credits';

export const fetchCreditsRequest = () => ({
    type: FETCH_CREDITS_REQUEST
});

export const fetchCreditsSuccess = payload => ({
    type: FETCH_CREDITS_SUCCESS,
    payload
});

export const fetchCreditsFailure = error => ({
    type: FETCH_CREDITS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCreditsRequest());

    axios
        .get(`${API_URL}/credits`, getHeaders())
        .then(res => dispatch(fetchCreditsSuccess(res.data)))
        .catch(err => dispatch(fetchCreditsFailure(err.message)));
};
