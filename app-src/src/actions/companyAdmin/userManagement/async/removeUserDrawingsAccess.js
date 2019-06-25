import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_USER_DRAWINGS_REQUEST,
    FETCH_USER_DRAWINGS_SUCCESS,
    FETCH_USER_DRAWINGS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const removeUserDrawingsRequest = () => ({
    type: FETCH_USER_DRAWINGS_REQUEST
});

export const removeUserDrawingsSuccess = payload => ({
    type: FETCH_USER_DRAWINGS_SUCCESS,
    payload
});

export const removeUserDrawingsFailure = error => ({
    type: FETCH_USER_DRAWINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(removeUserDrawingsRequest());

    return axios
        .get(`${API_URL}/users`, getHeaders())
        .then(res => dispatch(removeUserDrawingsSuccess(res.data)))
        .catch(error => {
            dispatch(removeUserDrawingsFailure(error.message));
        });
};
