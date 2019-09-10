import axios from 'axios';

import {
    DELETE_TEMPLATE_REQUEST,
    DELETE_TEMPLATE_SUCCESS,
    DELETE_TEMPLATE_FAILURE,
    DELETE_TEMPLATE_UNAVAILABLE
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

export const deleteTemplateUnavailable = error => ({
    type: DELETE_TEMPLATE_UNAVAILABLE,
    error
});

export default uuid => dispatch => {
    dispatch(deleteTemplateRequest());

    return axios
        .delete(`${ADMIN_API_URL}/templates/${uuid}`, getHeaders())
        .then(res => {
            if (res.status === 202) {
                return dispatch(deleteTemplateUnavailable(res.data.message));
            }
            return dispatch(deleteTemplateSuccess(res.data));
        })
        .catch(err => dispatch(deleteTemplateFailure(err.message)));
};
