import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_COMPANY_USER_REQUEST,
    CREATE_COMPANY_USER_SUCCESS,
    CREATE_COMPANY_USER_FAILURE
} from 'constants/actionTypes/usersManagement';

export const createCompanyAdminRequest = () => ({
    type: CREATE_COMPANY_USER_REQUEST
});

export const createCompanyAdminSuccess = payload => ({
    type: CREATE_COMPANY_USER_SUCCESS,
    payload
});

export const createCompanyAdminFailure = error => ({
    type: CREATE_COMPANY_USER_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createCompanyAdminRequest());

    return axios
        .post(`${API_URL}/sites`, postBody, getHeaders())
        .then(result => dispatch(createCompanyAdminSuccess(result.data)))
        .catch(error => {
            dispatch(createCompanyAdminFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
