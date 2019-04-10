import axios from 'axios';

import { ROOT_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE
} from 'constants/actionTypes/profile';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

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
        .post(`${ROOT_API_URL}/profile`, postBody, getHeaders())
        .then(res => dispatch(editProfileSuccess(res.data)))
        .catch(error => {
            dispatch(editProfileFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
