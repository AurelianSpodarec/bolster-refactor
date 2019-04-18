import axios from 'axios';

import { getHeaders, handleErrors } from 'helpers/api';
import {
    REISSUE_TOKEN_REQUEST,
    REISSUE_TOKEN_SUCCESS,
    REISSUE_TOKEN_FAILURE
} from 'constants/actionTypes/auth';
import { AUTH_API_URL } from 'config';

export const reissueTokenRequest = () => ({
    type: REISSUE_TOKEN_REQUEST
});

export const reissueTokenSuccess = payload => ({
    type: REISSUE_TOKEN_SUCCESS,
    payload
});

export const reissueTokenFailure = error => ({
    type: REISSUE_TOKEN_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(reissueTokenRequest());

    return axios
        .get(
            `${AUTH_API_URL}/headquarters/reissue${
                companyID ? `?companyID=${companyID}` : ''
            }`,
            getHeaders()
        )
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            dispatch(reissueTokenSuccess(data));
        })
        .catch(err => {
            const errorAction = handleErrors(reissueTokenFailure);
            dispatch(errorAction(err));
        });
};
