import axios from 'axios';

import {
    FETCH_USER_GUIDE_REQUEST,
    FETCH_USER_GUIDE_SUCCESS,
    FETCH_USER_GUIDE_FAILURE,
} from 'constants/actionTypes/userGuide';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const fetchUserGuideRequest = () => ({
    type: FETCH_USER_GUIDE_REQUEST,
});
export const fetchUserGuideSuccess = payload => ({
    type: FETCH_USER_GUIDE_SUCCESS,
    payload,
});
export const fetchUserGuideFailure = error => ({
    type: FETCH_USER_GUIDE_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchUserGuideRequest());
    return axios
        .get(`${API_URL}/userguide/latest`, getHeaders())
        .then(({ data }) => dispatch(fetchUserGuideSuccess(data)))
        .catch(err => {
            dispatch(fetchUserGuideFailure(err.message));
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
