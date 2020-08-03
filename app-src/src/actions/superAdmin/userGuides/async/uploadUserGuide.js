import axios from 'axios';

import {
    ADMIN_UPLOAD_USER_GUIDE_REQUEST,
    ADMIN_UPLOAD_USER_GUIDE_SUCCESS,
    ADMIN_UPLOAD_USER_GUIDE_FAILURE,
} from 'constants/actionTypes/userGuide';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const uploadUserGuideRequest = () => ({
    type: ADMIN_UPLOAD_USER_GUIDE_REQUEST,
});
export const uploadUserGuideSuccess = payload => ({
    type: ADMIN_UPLOAD_USER_GUIDE_SUCCESS,
    payload,
});
export const uploadUserGuideFailure = error => ({
    type: ADMIN_UPLOAD_USER_GUIDE_FAILURE,
    error,
});

export default fileS3Key => dispatch => {
    dispatch(uploadUserGuideRequest());
    return axios
        .post(`${ADMIN_API_URL}/userguide`, { S3Key: fileS3Key }, getHeaders())
        .then(({ data }) => dispatch(uploadUserGuideSuccess(data)))
        .catch(err => {
            dispatch(uploadUserGuideFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
