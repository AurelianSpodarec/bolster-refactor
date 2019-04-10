import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    CREATE_CREDITS_REQUEST,
    CREATE_CREDITS_SUCCESS,
    CREATE_CREDITS_FAILURE
} from 'constants/actionTypes/credits';

export const createCreditsRequest = () => ({
    type: CREATE_CREDITS_REQUEST
});

export const createCreditsSuccess = payload => ({
    type: CREATE_CREDITS_SUCCESS,
    payload
});

export const createCreditsFailure = error => ({
    type: CREATE_CREDITS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createCreditsRequest());

    return axios
        .post(`${API_URL}/subscriptions/credits`, postBody, getHeaders())
        .then(res => dispatch(createCreditsSuccess(res.data)))
        .catch(err => dispatch(createCreditsFailure(err.message)));
};
