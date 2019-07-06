import axios from 'axios';

import {
    FETCH_TEMPLATES_SIMPLE_REQUEST,
    FETCH_TEMPLATES_SIMPLE_SUCCESS,
    FETCH_TEMPLATES_SIMPLE_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTemplatesRequest = () => ({
    type: FETCH_TEMPLATES_SIMPLE_REQUEST
});

export const fetchTemplatesSuccess = payload => ({
    type: FETCH_TEMPLATES_SIMPLE_SUCCESS,
    payload
});

export const fetchTemplatesFailure = error => ({
    type: FETCH_TEMPLATES_SIMPLE_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchTemplatesRequest());

    return axios
        .get(`${ADMIN_API_URL}/templates/simple`, getHeaders())
        .then(res => dispatch(fetchTemplatesSuccess(res.data)))
        .catch(err => dispatch(fetchTemplatesFailure(err.message)));
};
