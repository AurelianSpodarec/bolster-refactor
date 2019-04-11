import axios from 'axios';

import {
    DELETE_CARD_REQUEST,
    DELETE_CARD_SUCCESS,
    DELETE_CARD_FAILURE
} from 'constants/actionTypes/cards';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteCardRequest = () => ({
    type: DELETE_CARD_REQUEST
});

export const deleteCardSuccess = id => ({
    type: DELETE_CARD_SUCCESS,
    id
});

export const deleteCardFailure = error => ({
    type: DELETE_CARD_FAILURE,
    error
});

export default cardID => dispatch => {
    dispatch(deleteCardRequest());

    axios
        .delete(`${API_URL}/cards/${cardID}`, getHeaders())
        .then(() => dispatch(deleteCardSuccess(cardID)))
        .catch(err => dispatch(deleteCardFailure(err.message)));
};
