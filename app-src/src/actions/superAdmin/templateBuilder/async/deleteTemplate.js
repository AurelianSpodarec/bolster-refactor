import axios from 'axios';

import {
    DELETE_TEMPLATE_REQUEST,
    DELETE_TEMPLATE_SUCCESS,
    DELETE_TEMPLATE_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteTemplateRequest = () => ({
    type: DELETE_TEMPLATE_REQUEST
});

export const deleteTemplateSuccess = ({
    template,
    sections,
    questions,
    labelFields,
    statusOptions
}) => ({
    type: DELETE_TEMPLATE_SUCCESS,
    template,
    sections,
    questions,
    labelFields,
    statusOptions
});

export const deleteTemplateFailure = error => ({
    type: DELETE_TEMPLATE_FAILURE,
    error
});

export default uuid => dispatch => {
    dispatch(deleteTemplateRequest());

    return axios
        .delete(`${ADMIN_API_URL}/templates/${uuid}`, getHeaders())
        .then(res => dispatch(deleteTemplateSuccess(res.data)))
        .catch(err => dispatch(deleteTemplateFailure(err.message)));
};
