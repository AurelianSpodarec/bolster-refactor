import axios from 'axios';

import {
    FETCH_TEMPLATE_FOR_COMPANY_REQUEST,
    FETCH_TEMPLATE_FOR_COMPANY_SUCCESS,
    FETCH_TEMPLATE_FOR_COMPANY_FAILURE
} from 'constants/actionTypes/templateBuilder';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTemplateRequest = () => ({
    type: FETCH_TEMPLATE_FOR_COMPANY_REQUEST
});

export const fetchTemplateSuccess = ({
    template,
    sections,
    questions,
    labelFields,
    statusOptions
}) => ({
    type: FETCH_TEMPLATE_FOR_COMPANY_SUCCESS,
    template,
    sections,
    questions,
    labelFields,
    statusOptions
});

export const fetchTemplateFailure = error => ({
    type: FETCH_TEMPLATE_FOR_COMPANY_FAILURE,
    error
});

export default (companyID, uuid) => dispatch => {
    dispatch(fetchTemplateRequest());

    return axios
        .get(`${ADMIN_API_URL}/templates/company/${companyID}/${uuid}`, getHeaders())
        .then(({ data }) => dispatch(fetchTemplateSuccess(data)))
        .catch(err => {
            if (err.status !== 404) return dispatch(fetchTemplateFailure(err.message));
            // only errors if a template exists but shouldn't be accessed, 404 will keep us on the same page so a new template can be made
            else return dispatch(fetchTemplateSuccess());
        });
};
