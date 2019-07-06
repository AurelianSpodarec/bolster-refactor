import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_POST_TEMPLATES_FOR_SERVICE_REQUEST,
    ADMIN_POST_TEMPLATES_FOR_SERVICE_SUCCESS,
    ADMIN_POST_TEMPLATES_FOR_SERVICE_FAILURE
} from 'constants/actionTypes/services';

export const postServiceTemplatesRequest = () => ({
    type: ADMIN_POST_TEMPLATES_FOR_SERVICE_REQUEST
});

export const postServiceTemplatesSuccess = payload => ({
    type: ADMIN_POST_TEMPLATES_FOR_SERVICE_SUCCESS,
    payload
});

export const postServiceTemplatesFailure = error => ({
    type: ADMIN_POST_TEMPLATES_FOR_SERVICE_FAILURE,
    error
});

export default (serviceID, postBody) => dispatch => {
    dispatch(postServiceTemplatesRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/services/${serviceID}/templates/add`,
            postBody,
            getHeaders()
        )
        .then(res => dispatch(postServiceTemplatesSuccess(res.data)))
        .catch(err => dispatch(postServiceTemplatesFailure(err.message)));
};
