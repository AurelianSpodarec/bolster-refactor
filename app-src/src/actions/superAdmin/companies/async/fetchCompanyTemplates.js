import axios from 'axios';

import {
    FETCH_COMPANY_TEMPLATES_REQUEST,
    FETCH_COMPANY_TEMPLATES_SUCCESS,
    FETCH_COMPANY_TEMPLATES_FAILURE
} from 'constants/actionTypes/companies';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchTemplatesRequest = () => ({
    type: FETCH_COMPANY_TEMPLATES_REQUEST
});

export const fetchTemplatesSuccess = payload => ({
    type: FETCH_COMPANY_TEMPLATES_SUCCESS,
    payload
});

export const fetchTemplatesFailure = error => ({
    type: FETCH_COMPANY_TEMPLATES_FAILURE,
    error
});

export default id => dispatch => {
    dispatch(fetchTemplatesRequest());

    return axios
        .get(`${ADMIN_API_URL}/templates/company/${id}`, getHeaders())
        .then(res =>
            dispatch(fetchTemplatesSuccess(res.data.map(item => item.template)))
        )
        .catch(err => dispatch(fetchTemplatesFailure(err.message)));
};
