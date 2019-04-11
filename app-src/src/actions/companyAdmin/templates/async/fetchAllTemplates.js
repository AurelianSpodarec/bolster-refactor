import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ALL_TEMPLATES_REQUEST,
    FETCH_ALL_TEMPLATES_SUCCESS,
    FETCH_ALL_TEMPLATES_FAILURE
} from 'constants/actionTypes/templates';

export const fetchAllTemplatesRequest = () => ({
    type: FETCH_ALL_TEMPLATES_REQUEST
});

export const fetchAllTemplatesSuccess = payload => ({
    type: FETCH_ALL_TEMPLATES_SUCCESS,
    payload
});

export const fetchAllTemplatesFailure = error => ({
    type: FETCH_ALL_TEMPLATES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllTemplatesRequest());

    axios
        .get(`${API_URL}/templates`, getHeaders())
        .then(res => dispatch(fetchAllTemplatesSuccess(res.data)))
        .catch(err => dispatch(fetchAllTemplatesFailure(err.message)));
};
