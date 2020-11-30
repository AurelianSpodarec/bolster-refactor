import axios from 'axios';

import {
    ADMIN_UPLOAD_TRUSTED_BY_REQUEST,
    ADMIN_UPLOAD_TRUSTED_BY_FAILURE,
    ADMIN_UPLOAD_TRUSTED_BY_SUCCESS,
} from 'constants/actionTypes/frontendTrustedBySettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const uploadTrustedByRequest = () => ({
    type: ADMIN_UPLOAD_TRUSTED_BY_REQUEST,
});
export const uploadTrustedBySuccess = payload => ({
    type: ADMIN_UPLOAD_TRUSTED_BY_SUCCESS,
    payload,
});
export const uploadTrustedByFailure = error => ({
    type: ADMIN_UPLOAD_TRUSTED_BY_FAILURE,
    error,
});

export default body => dispatch => {
    dispatch(uploadTrustedByRequest());
    return axios
        .post(`${ADMIN_API_URL}/FrontEndSettings`, body, getHeaders())
        .then(({ data }) => dispatch(uploadTrustedBySuccess(data)))
        .catch(err => {
            dispatch(uploadTrustedByFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
