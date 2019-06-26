import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_FETCH_TEMPLATES_FOR_SERVICE_REQUEST,
    ADMIN_FETCH_TEMPLATES_FOR_SERVICE_SUCCESS,
    ADMIN_FETCH_TEMPLATES_FOR_SERVICE_FAILURE
} from 'constants/actionTypes/services';

export const fetchServiceTemplateRequest = () => ({
    type: ADMIN_FETCH_TEMPLATES_FOR_SERVICE_REQUEST
});

export const fetchServiceTemplateSuccess = payload => ({
    type: ADMIN_FETCH_TEMPLATES_FOR_SERVICE_SUCCESS,
    payload
});

export const fetchServiceTemplateFailure = error => ({
    type: ADMIN_FETCH_TEMPLATES_FOR_SERVICE_FAILURE,
    error
});

export default serviceID => dispatch => {
    dispatch(fetchServiceTemplateRequest());

    return axios
        .get(`${ADMIN_API_URL}/services/${serviceID}/templates`, getHeaders())
        .then(res => dispatch(fetchServiceTemplateSuccess(res.data)))
        .catch(err => dispatch(fetchServiceTemplateFailure(err.message)));
};
