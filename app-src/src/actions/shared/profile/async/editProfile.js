import axios from 'axios';

import { AUTH_API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from 'constants/actionTypes/profile';

export const editProfileRequest = () => ({
    type: EDIT_PROFILE_REQUEST
});

export const editProfileSuccess = payload => ({
    type: EDIT_PROFILE_SUCCESS,
    payload
});

export const editProfileFailure = error => ({
    type: EDIT_PROFILE_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(editProfileRequest());
    return axios
        .post(`${AUTH_API_URL}/profile`, postBody, getHeaders())
        .then(res => dispatch(editProfileSuccess(res.data)))
        .catch(err => {
            const errorAction = handleErrors(editProfileFailure);
            dispatch(errorAction(err));
        });
};
