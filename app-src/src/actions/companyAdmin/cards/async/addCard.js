import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    ADD_CARD_REQUEST,
    ADD_CARD_SUCCESS,
    ADD_CARD_FAILURE
} from 'constants/actionTypes/cards';

export const addCardRequest = () => ({
    type: ADD_CARD_REQUEST
});

export const addCardSuccess = payload => ({
    type: ADD_CARD_SUCCESS,
    payload
});

export const addCardFailure = error => ({
    type: ADD_CARD_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(addCardRequest());

    return axios
        .post(`${API_URL}/cards`, postBody, getHeaders())
        .then(res => dispatch(addCardSuccess(res.data)))
        .catch(err => {
            dispatch(addCardFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
