import axios from 'axios';

import {
    ADMIN_DELETE_TRUSTED_BY_REQUEST,
    ADMIN_DELETE_TRUSTED_BY_FAILURE,
    ADMIN_DELETE_TRUSTED_BY_SUCCESS,
} from 'constants/actionTypes/frontendTrustedBySettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const deleteTrustedByRequest = () => ({
    type: ADMIN_DELETE_TRUSTED_BY_REQUEST,
});
export const deleteTrustedBySuccess = payload => ({
    type: ADMIN_DELETE_TRUSTED_BY_SUCCESS,
    payload,
});
export const deleteTrustedByFailure = error => ({
    type: ADMIN_DELETE_TRUSTED_BY_FAILURE,
    error,
});

export default index => dispatch => {
    dispatch(deleteTrustedByRequest());
    return axios
        .delete(`${ADMIN_API_URL}/FrontEndSettings/${index}`, getHeaders())
        .then(({ data }) => dispatch(deleteTrustedBySuccess(data)))
        .catch(err => {
            dispatch(deleteTrustedByFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
