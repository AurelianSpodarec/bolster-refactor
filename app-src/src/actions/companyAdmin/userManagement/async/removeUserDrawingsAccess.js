import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    REMOVE_USER_DRAWINGS_ACCESS_REQUEST,
    REMOVE_USER_DRAWINGS_ACCESS_SUCCESS,
    REMOVE_USER_DRAWINGS_ACCESS_FAILURE
} from 'constants/actionTypes/usersManagement';

export const removeUserDrawingsRequest = () => ({
    type: REMOVE_USER_DRAWINGS_ACCESS_REQUEST
});

export const removeUserDrawingsSuccess = payload => ({
    type: REMOVE_USER_DRAWINGS_ACCESS_SUCCESS,
    payload
});

export const removeUserDrawingsFailure = error => ({
    type: REMOVE_USER_DRAWINGS_ACCESS_FAILURE,
    error
});

export default (userID, postBody) => dispatch => {
    dispatch(removeUserDrawingsRequest());

    return axios
        .post(
            `${API_URL}/users/${userID}/drawings/remove`,
            postBody,
            getHeaders()
        )
        .then(res => dispatch(removeUserDrawingsSuccess(res.data)))
        .catch(error => {
            dispatch(removeUserDrawingsFailure(error.message));
        });
};
