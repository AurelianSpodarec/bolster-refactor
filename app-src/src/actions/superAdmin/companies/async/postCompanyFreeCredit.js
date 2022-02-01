import axios from 'axios';

import {
    ADMIN_EDIT_COMPANY_FREE_CREDIT_FAILURE,
    ADMIN_EDIT_COMPANY_FREE_CREDIT_REQUEST,
    ADMIN_EDIT_COMPANY_FREE_CREDIT_SUCCESS,
} from 'constants/actionTypes/companies';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const postCompanyFreeCreditRequest = () => ({
    type: ADMIN_EDIT_COMPANY_FREE_CREDIT_REQUEST,
});
export const postCompanyFreeCreditSuccess = payload => ({
    type: ADMIN_EDIT_COMPANY_FREE_CREDIT_SUCCESS,
    payload,
});
export const postCompanyFreeCreditFailure = error => ({
    type: ADMIN_EDIT_COMPANY_FREE_CREDIT_FAILURE,
    error,
});

export default (companyID, postBody) => dispatch => {
    dispatch(postCompanyFreeCreditRequest());
    return axios
        .patch(`${ADMIN_API_URL}/companies/${companyID}/freeCredit`, postBody, getHeaders())
        .then(({ data }) => dispatch(postCompanyFreeCreditSuccess(data)))
        .catch(err => {
            dispatch(postCompanyFreeCreditFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
