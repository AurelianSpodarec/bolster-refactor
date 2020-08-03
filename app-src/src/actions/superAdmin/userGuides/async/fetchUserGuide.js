import axios from 'axios';

import {
    ADMIN_FETCH_USER_GUIDE_REQUEST,
    ADMIN_FETCH_USER_GUIDE_SUCCESS,
    ADMIN_FETCH_USER_GUIDE_FAILURE,
} from 'constants/actionTypes/userGuide';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchUserGuideRequest = () => ({
    type: ADMIN_FETCH_USER_GUIDE_REQUEST,
});
export const fetchUserGuideSuccess = payload => ({
    type: ADMIN_FETCH_USER_GUIDE_SUCCESS,
    payload,
});
export const fetchUserGuideFailure = error => ({
    type: ADMIN_FETCH_USER_GUIDE_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchUserGuideRequest());

    return axios
        .get(`${API_URL}/userguide/latest`, getHeaders())
        .then(({ data }) => dispatch(fetchUserGuideSuccess(data)))
        .catch(err => dispatch(fetchUserGuideFailure(err.message)));
};
