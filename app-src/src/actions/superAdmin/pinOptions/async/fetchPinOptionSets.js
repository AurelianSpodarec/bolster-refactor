import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ADMIN_PIN_OPTION_SETS_REQUEST,
    FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS,
    FETCH_ADMIN_PIN_OPTION_SETS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionSetsRequest = () => ({
    type: FETCH_ADMIN_PIN_OPTION_SETS_REQUEST,
});

export const fetchPinOptionSetsSuccess = payload => ({
    type: FETCH_ADMIN_PIN_OPTION_SETS_SUCCESS,
    payload,
});

export const fetchPinOptionSetsFailure = error => ({
    type: FETCH_ADMIN_PIN_OPTION_SETS_FAILURE,
    error,
});

export default () => async dispatch => {
    dispatch(fetchPinOptionSetsRequest());

    return axios
        .get(`${ADMIN_API_URL}/pinoptions/sets`, getHeaders())
        .then(res => dispatch(fetchPinOptionSetsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionSetsFailure(err.message)));
};
