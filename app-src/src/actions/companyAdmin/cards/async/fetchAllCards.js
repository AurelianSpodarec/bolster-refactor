import axios from 'axios';

import { API_URL } from 'config';
import {
    FETCH_ALL_CARDS_REQUEST,
    FETCH_ALL_CARDS_SUCCESS,
    FETCH_ALL_CARDS_FAILURE
} from 'constants/actionTypes/cards';
import { getHeaders } from 'helpers/api';

export const fetchCardsRequest = () => ({
    type: FETCH_ALL_CARDS_REQUEST
});

export const fetchCardsSuccess = payload => ({
    type: FETCH_ALL_CARDS_SUCCESS,
    payload
});

export const fetchCardsFailure = error => ({
    type: FETCH_ALL_CARDS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCardsRequest());

    axios
        .get(`${API_URL}/cards`, getHeaders())
        .then(res => dispatch(fetchCardsSuccess(res.data)))
        .catch(err => dispatch(fetchCardsFailure(err.message)));
};
