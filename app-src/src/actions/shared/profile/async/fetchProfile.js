import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PROFILE_REQUEST,
    FETCH_PROFILE_SUCCESS,
    FETCH_PROFILE_FAILURE
} from 'constants/actionTypes/profile';

export const fetchProfileRequest = () => ({
    type: FETCH_PROFILE_REQUEST
});

export const fetchProfileSuccess = payload => ({
    type: FETCH_PROFILE_SUCCESS,
    payload
});

export const fetchProfileFailure = error => ({
    type: FETCH_PROFILE_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchProfileRequest());
    return axios
        .get(`${API_URL}/profile`, getHeaders())
        .then(res => dispatch(fetchProfileSuccess(res.data)))
        .catch(err => dispatch(fetchProfileFailure(err.message)));
};
