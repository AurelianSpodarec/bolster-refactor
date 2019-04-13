import axios from 'axios';

import {
    FETCH_TEMPLATE_REQUEST,
    FETCH_TEMPLATE_SUCCESS,
    FETCH_TEMPLATE_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import { formatQuestions } from 'helpers/templates';

export const fetchTemplateRequest = () => ({
    type: FETCH_TEMPLATE_REQUEST
});

export const fetchTemplateSuccess = ({ template, sections, questions }) => ({
    type: FETCH_TEMPLATE_SUCCESS,
    template,
    sections,
    questions: formatQuestions(questions)
});

export const fetchTemplateFailure = error => ({
    type: FETCH_TEMPLATE_FAILURE,
    error
});

export default uuid => dispatch => {
    dispatch(fetchTemplateRequest());

    return axios
        .get(`${ADMIN_API_URL}/templates/${uuid}`, getHeaders())
        .then(res => dispatch(fetchTemplateSuccess(res.data)))
        .catch(err => dispatch(fetchTemplateFailure(err.message)));
};
