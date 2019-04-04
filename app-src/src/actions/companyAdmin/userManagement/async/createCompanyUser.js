import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_COMPANY_USER_REQUEST,
    CREATE_COMPANY_USER_SUCCESS,
    CREATE_COMPANY_USER_FAILURE
} from 'constants/actionTypes/usersManagement';

export const createCompanyUserRequest = () => ({
    type: CREATE_COMPANY_USER_REQUEST
});

export const createCompanyUserSuccess = payload => ({
    type: CREATE_COMPANY_USER_SUCCESS,
    payload
});

export const createCompanyUserFailure = error => ({
    type: CREATE_COMPANY_USER_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createCompanyUserRequest());

    return axios
        .post(`${API_URL}/users`, postBody, getHeaders())
        .then(result => dispatch(createCompanyUserSuccess(result.data)))
        .catch(error => {
            dispatch(createCompanyUserFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
