import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_CARD_REQUEST,
    FETCH_CARD_SUCCESS,
    FETCH_CARD_FAILURE
} from 'constants/actionTypes/cards';
import { getHeaders } from 'helpers/api';

export const fetchCardRequest = () => ({
    type: FETCH_CARD_REQUEST
});

export const fetchCardSuccess = payload => ({
    type: FETCH_CARD_SUCCESS,
    payload
});

export const fetchCardFailure = error => ({
    type: FETCH_CARD_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchCardRequest());

    axios
        .get(`${API_URL}/cards/${id}`, getHeaders())
        .then(res => dispatch(fetchCardSuccess(res.data)))
        .catch(err => dispatch(fetchCardFailure(err.message)));
};
