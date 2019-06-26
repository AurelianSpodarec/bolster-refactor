import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CHANGE_USER_TYPE_REQUEST,
    CHANGE_USER_TYPE_SUCCESS,
    CHANGE_USER_TYPE_FAILURE
} from 'constants/actionTypes/usersManagement';

export const changeUserTypeRequest = () => ({
    type: CHANGE_USER_TYPE_REQUEST
});

export const changeUserTypeSuccess = payload => ({
    type: CHANGE_USER_TYPE_SUCCESS,
    payload
});

export const changeUserTypeFailure = error => ({
    type: CHANGE_USER_TYPE_FAILURE,
    error
});

export default (companyUserID, postBody) => dispatch => {
    dispatch(changeUserTypeRequest());

    return axios
        .post(
            `${API_URL}/users/${companyUserID}/changetype`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(changeUserTypeSuccess(result.data)))
        .catch(error => {
            dispatch(changeUserTypeFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
