import axios from 'axios';
import {
    CREATE_SERVICE_REQUEST,
    CREATE_SERVICE_SUCCESS,
    CREATE_SERVICE_FAILURE
} from 'constants/actionTypes/services';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';

export const createServiceRequest = () => ({
    type: CREATE_SERVICE_REQUEST
});

export const createServiceSuccess = payload => ({
    type: CREATE_SERVICE_SUCCESS,
    payload
});

export const createServiceFailure = error => ({
    type: CREATE_SERVICE_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createServiceRequest());

    return axios
        .post(`${ADMIN_API_URL}/services`, postBody, getHeaders())
        .then(({ data }) => dispatch(createServiceSuccess(data)))
        .catch(err => {
            dispatch(createServiceFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
