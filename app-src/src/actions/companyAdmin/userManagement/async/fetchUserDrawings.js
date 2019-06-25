import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_USER_DRAWINGS_REQUEST,
    FETCH_USER_DRAWINGS_SUCCESS,
    FETCH_USER_DRAWINGS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const fetchUserDrawingsRequest = () => ({
    type: FETCH_USER_DRAWINGS_REQUEST
});

export const fetchUserDrawingsSuccess = payload => ({
    type: FETCH_USER_DRAWINGS_SUCCESS,
    payload
});

export const fetchUserDrawingsFailure = error => ({
    type: FETCH_USER_DRAWINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchUserDrawingsRequest());

    return axios
        .get(`${API_URL}/users`, getHeaders())
        .then(res => dispatch(fetchUserDrawingsSuccess(res.data)))
        .catch(error => {
            dispatch(fetchUserDrawingsFailure(error.message));
        });
};
