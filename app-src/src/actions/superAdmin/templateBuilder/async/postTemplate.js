import axios from 'axios';

import {
    POST_TEMPLATE_REQUEST,
    POST_TEMPLATE_SUCCESS,
    POST_TEMPLATE_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const postTemplateRequest = () => ({
    type: POST_TEMPLATE_REQUEST
});

export const postTemplateSuccess = (newTemplate, oldUuid) => ({
    type: POST_TEMPLATE_SUCCESS,
    newTemplate,
    oldUuid
});

export const postTemplateFailure = error => ({
    type: POST_TEMPLATE_FAILURE,
    error
});

export default template => dispatch => {
    dispatch(postTemplateRequest());

    return axios
        .post(`${ADMIN_API_URL}/templates`, template, getHeaders())
        .then(res => dispatch(postTemplateSuccess(res.data, template.uuid)))
        .catch(err => dispatch(postTemplateFailure(err.message)));
};
