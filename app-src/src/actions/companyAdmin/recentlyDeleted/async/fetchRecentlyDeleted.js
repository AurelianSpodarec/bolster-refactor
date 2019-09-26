import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_RECENTLY_DELETED_REQUEST,
    FETCH_RECENTLY_DELETED_SUCCESS,
    FETCH_RECENTLY_DELETED_FAILURE
} from 'constants/actionTypes/deletedData';

export const fetchRecentlyDeletedRequest = () => ({
    type: FETCH_RECENTLY_DELETED_REQUEST
});

export const fetchRecentlyDeletedSuccess = payload => ({
    type: FETCH_RECENTLY_DELETED_SUCCESS,
    payload
});

export const fetchRecentlyDeletedFailure = error => ({
    type: FETCH_RECENTLY_DELETED_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchRecentlyDeletedRequest());

    axios
        .get(`${API_URL}/deleted`, getHeaders())
        .then(res => dispatch(fetchRecentlyDeletedSuccess(res.data)))
        .catch(err => dispatch(fetchRecentlyDeletedFailure(err.message)));
};
