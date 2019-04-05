import axios from 'axios';

import {
    FETCH_TEMPLATES_REQUEST,
    FETCH_TEMPLATES_SUCCESS,
    FETCH_TEMPLATES_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTemplateRequest = () => ({
    type: FETCH_TEMPLATES_REQUEST
});

export const fetchTemplateSuccess = payload => ({
    type: FETCH_TEMPLATES_SUCCESS,
    payload
});

export const fetchTemplateFailure = error => ({
    type: FETCH_TEMPLATES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchTemplateRequest());

    return axios
        .get(`${ADMIN_API_URL}/templates`, getHeaders())
        .then(res =>
            dispatch(fetchTemplateSuccess(res.data.map(item => item.template)))
        )
        .catch(err => dispatch(fetchTemplateFailure(err.message)));
};
