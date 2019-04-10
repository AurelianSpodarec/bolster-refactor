import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    SET_PRIMARY_CARD_REQUEST,
    SET_PRIMARY_CARD_SUCCESS,
    SET_PRIMARY_CARD_FAILURE
} from 'constants/actionTypes/cards';

export const setPrimaryCardRequest = () => ({
    type: SET_PRIMARY_CARD_REQUEST
});

export const setPrimaryCardSuccess = payload => ({
    type: SET_PRIMARY_CARD_SUCCESS,
    payload
});

export const setPrimaryCardFailure = error => ({
    type: SET_PRIMARY_CARD_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(setPrimaryCardRequest());

    return axios
        .post(`${API_URL}/cards/primary`, postBody, getHeaders())
        .then(res => dispatch(setPrimaryCardSuccess(res.data)))
        .catch(err => {
            dispatch(setPrimaryCardFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
