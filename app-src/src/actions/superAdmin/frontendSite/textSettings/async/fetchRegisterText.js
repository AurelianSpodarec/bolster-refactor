import axios from 'axios';

import {
    ADMIN_FETCH_REGISTER_TEXT_REQUEST,
    ADMIN_FETCH_REGISTER_TEXT_SUCCESS,
    ADMIN_FETCH_REGISTER_TEXT_FAILURE,
} from 'constants/actionTypes/frontendTextSettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchRegisterTextRequest = () => ({
    type: ADMIN_FETCH_REGISTER_TEXT_REQUEST,
});
export const fetchRegisterTextSuccess = payload => ({
    type: ADMIN_FETCH_REGISTER_TEXT_SUCCESS,
    payload,
});
export const fetchRegisterTextFailure = error => ({
    type: ADMIN_FETCH_REGISTER_TEXT_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchRegisterTextRequest());

    return axios
        .get(`${ADMIN_API_URL}/FrontEndSettings/registertext`, getHeaders())
        .then(({ data }) => dispatch(fetchRegisterTextSuccess(data)))
        .catch(err => dispatch(fetchRegisterTextFailure(err.message)));
};
