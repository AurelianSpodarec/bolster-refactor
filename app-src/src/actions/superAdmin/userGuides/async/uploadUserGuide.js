import axios from 'axios';

import {
    UPLOAD_USER_GUIDE_REQUEST,
    UPLOAD_USER_GUIDE_SUCCESS,
    UPLOAD_USER_GUIDE_FAILURE,
} from 'constants/actionTypes/userGuide';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const uploadUserGuideRequest = () => ({
    type: UPLOAD_USER_GUIDE_REQUEST,
});
export const uploadUserGuideSuccess = payload => ({
    type: UPLOAD_USER_GUIDE_SUCCESS,
    payload,
});
export const uploadUserGuideFailure = error => ({
    type: UPLOAD_USER_GUIDE_FAILURE,
    error,
});

export default fileS3Key => dispatch => {
    dispatch(uploadUserGuideRequest());
    return axios
        .post(`${ADMIN_API_URL}/userguide`, fileS3Key, getHeaders())
        .then(({ data }) => dispatch(uploadUserGuideSuccess(data)))
        .catch(err => {
            dispatch(uploadUserGuideFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
