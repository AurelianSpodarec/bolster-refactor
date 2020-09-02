import axios from 'axios';

import {
    ADMIN_EDIT_COMPANY_ADDRESS_REQUEST,
    ADMIN_EDIT_COMPANY_ADDRESS_SUCCESS,
    ADMIN_EDIT_COMPANY_ADDRESS_FAILURE,
} from 'constants/actionTypes/companies';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const postCompanyAddressRequest = () => ({
    type: ADMIN_EDIT_COMPANY_ADDRESS_REQUEST,
});
export const postCompanyAddressSuccess = payload => ({
    type: ADMIN_EDIT_COMPANY_ADDRESS_SUCCESS,
    payload,
});
export const postCompanyAddressFailure = error => ({
    type: ADMIN_EDIT_COMPANY_ADDRESS_FAILURE,
    error,
});

export default (companyID, postBody) => dispatch => {
    dispatch(postCompanyAddressRequest());
    return axios
        .patch(`${ADMIN_API_URL}/companies/${companyID}/address`, postBody, getHeaders())
        .then(({ data }) => dispatch(postCompanyAddressSuccess(data)))
        .catch(err => {
            dispatch(postCompanyAddressFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
