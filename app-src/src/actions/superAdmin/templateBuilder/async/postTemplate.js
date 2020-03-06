import axios from 'axios';

import {
    POST_TEMPLATE_REQUEST,
    POST_TEMPLATE_SUCCESS,
    POST_TEMPLATE_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { formatQuestions } from 'helpers/templates';

export const postTemplateRequest = () => ({
    type: POST_TEMPLATE_REQUEST
});

export const postTemplateSuccess = (
    { template, sections, questions, labelFields, statusOptions },
    oldUUID
) => ({
    type: POST_TEMPLATE_SUCCESS,
    template,
    sections,
    questions: formatQuestions(questions),
    labelFields,
    statusOptions,
    oldUUID
});

export const postTemplateFailure = error => ({
    type: POST_TEMPLATE_FAILURE,
    error
});

export default templateData => dispatch => {
    dispatch(postTemplateRequest());
    
    return axios
        .post(`${ADMIN_API_URL}/templates`, templateData, getHeaders())
        .then(res =>
            dispatch(postTemplateSuccess(res.data, templateData.template.uuid))
        )
        .catch(({ response }) => {
            const { data: { errors } = {} } = response;
            const message = Object.values(errors).join(', \n');
            return dispatch(postTemplateFailure(message));
        });
};
