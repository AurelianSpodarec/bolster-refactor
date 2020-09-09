import axios from 'axios';

import {
    ADMIN_FETCH_ALL_USER_GUIDE_VERSIONS_REQUEST,
    ADMIN_FETCH_ALL_USER_GUIDE_VERSIONS_SUCCESS,
    ADMIN_FETCH_ALL_USER_GUIDE_VERSIONS_FAILURE,
} from 'constants/actionTypes/userGuide';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchUserGuideVersionsRequest = () => ({
    type: ADMIN_FETCH_ALL_USER_GUIDE_VERSIONS_REQUEST,
});
export const fetchUserGuideVersionsSuccess = payload => ({
    type: ADMIN_FETCH_ALL_USER_GUIDE_VERSIONS_SUCCESS,
    payload,
});
export const fetchUserGuideVersionsFailure = error => ({
    type: ADMIN_FETCH_ALL_USER_GUIDE_VERSIONS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchUserGuideVersionsRequest());

    return axios
        .get(`${ADMIN_API_URL}/userguide`, getHeaders())
        .then(({ data }) => dispatch(fetchUserGuideVersionsSuccess(data)))
        .catch(err => dispatch(fetchUserGuideVersionsFailure(err.message)));
};
