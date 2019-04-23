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

export const setPrimaryCardSuccess = cardID => ({
    type: SET_PRIMARY_CARD_SUCCESS,
    cardID
});

export const setPrimaryCardFailure = error => ({
    type: SET_PRIMARY_CARD_FAILURE,
    error
});

export default stripeCardID => dispatch => {
    dispatch(setPrimaryCardRequest());

    return axios
        .post(`${API_URL}/cards/primary`, { stripeCardID }, getHeaders())
        .then(() => dispatch(setPrimaryCardSuccess(stripeCardID)))
        .catch(err => {
            if (err.response.status === 400)
                return dispatch(setAPIFieldErrors(err.response.data.errors));
            return dispatch(setPrimaryCardFailure(err.message));
        });
};
