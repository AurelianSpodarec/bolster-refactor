import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    CREATE_HEADQUARTERS_COMPANY_REQUEST,
    CREATE_HEADQUARTERS_COMPANY_SUCCESS,
    CREATE_HEADQUARTERS_COMPANY_FAILURE
} from 'constants/actionTypes/headquarters';

export const createHeadquartersCompanyRequest = () => ({
    type: CREATE_HEADQUARTERS_COMPANY_REQUEST
});

export const createHeadquartersCompanySuccess = payload => ({
    type: CREATE_HEADQUARTERS_COMPANY_SUCCESS,
    payload
});

export const createHeadquartersCompanyFailure = error => ({
    type: CREATE_HEADQUARTERS_COMPANY_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(createHeadquartersCompanyRequest());

    return axios
        .post(`${API_URL}/headquarters/companies`, postBody, getHeaders())
        .then(res => dispatch(createHeadquartersCompanySuccess(res.data)))
        .catch(err => {
            dispatch(createHeadquartersCompanyFailure(err.message));

            if (err.response.status === 400)
                dispatch(setAPIFieldErrors(err.response.data.errors));
        });
};
