import axios from 'axios';

import {
    ADMIN_UPDATE_FRONTEND_TEXT_REQUEST,
    ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS,
    ADMIN_UPDATE_FRONTEND_TEXT_FAILURE,
} from 'constants/actionTypes/frontendTextSettings';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const updateFrontendTextRequest = () => ({
    type: ADMIN_UPDATE_FRONTEND_TEXT_REQUEST,
});
export const updateFrontendTextSuccess = payload => ({
    type: ADMIN_UPDATE_FRONTEND_TEXT_SUCCESS,
    payload,
});
export const updateFrontendTextFailure = error => ({
    type: ADMIN_UPDATE_FRONTEND_TEXT_FAILURE,
    error,
});

export default formData => dispatch => {
    dispatch(updateFrontendTextRequest());

    return axios
        .put(`${ADMIN_API_URL}/FrontEndSettings/text`, formData, getHeaders())
        .then(({ data }) => dispatch(updateFrontendTextSuccess(data)))
        .catch(err => dispatch(updateFrontendTextFailure(err.message)));
};
