import axios from 'axios';

import {
    FETCH_TEMPLATES_REQUEST,
    FETCH_TEMPLATES_SUCCESS,
    FETCH_TEMPLATES_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTemplatesRequest = () => ({
    type: FETCH_TEMPLATES_REQUEST
});

export const fetchTemplatesSuccess = payload => ({
    type: FETCH_TEMPLATES_SUCCESS,
    payload
});

export const fetchTemplatesFailure = error => ({
    type: FETCH_TEMPLATES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchTemplatesRequest());

    return axios
        .get(`${ADMIN_API_URL}/templates`, getHeaders())
        .then(res =>
            dispatch(
                fetchTemplatesSuccess(res.data.map(item => item.adminTemplate))
            )
        )
        .catch(err => dispatch(fetchTemplatesFailure(err.message)));
};
