import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    ADMIN_REMOVE_TEMPLATES_FOR_SERVICE_REQUEST,
    ADMIN_REMOVE_TEMPLATES_FOR_SERVICE_SUCCESS,
    ADMIN_REMOVE_TEMPLATES_FOR_SERVICE_FAILURE
} from 'constants/actionTypes/services';

export const removeServiceTemplatesRequest = () => ({
    type: ADMIN_REMOVE_TEMPLATES_FOR_SERVICE_REQUEST
});

export const removeServiceTemplatesSuccess = payload => ({
    type: ADMIN_REMOVE_TEMPLATES_FOR_SERVICE_SUCCESS,
    payload
});

export const removeServiceTemplatesFailure = error => ({
    type: ADMIN_REMOVE_TEMPLATES_FOR_SERVICE_FAILURE,
    error
});

export default (serviceID, postBody) => dispatch => {
    dispatch(removeServiceTemplatesRequest());

    return axios
        .post(
            `${ADMIN_API_URL}/services/${serviceID}/templates/remove`,
            postBody,
            getHeaders()
        )
        .then(res => dispatch(removeServiceTemplatesSuccess(res.data)))
        .catch(err => dispatch(removeServiceTemplatesFailure(err.message)));
};
