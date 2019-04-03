import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_COMPANY_USER_REQUEST,
    CREATE_COMPANY_USER_SUCCESS,
    CREATE_COMPANY_USER_FAILURE
} from 'constants/actionTypes/usersManagement';

export const createOperativeRequest = () => ({
    type: CREATE_COMPANY_USER_REQUEST
});

export const createOperativeSuccess = payload => ({
    type: CREATE_COMPANY_USER_SUCCESS,
    payload
});

export const createOperativeFailure = error => ({
    type: CREATE_COMPANY_USER_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createOperativeRequest());

    return axios
        .post(`${API_URL}/sites`, postBody, getHeaders())
        .then(result => dispatch(createOperativeSuccess(result.data)))
        .catch(error => {
            dispatch(createOperativeFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
