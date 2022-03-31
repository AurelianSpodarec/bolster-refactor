import axios from 'axios';

import { getHeaders } from 'helpers/api';
import {
    ADMIN_FETCH_RECENTLY_DELETED_REQUEST,
    ADMIN_FETCH_RECENTLY_DELETED_SUCCESS,
    ADMIN_FETCH_RECENTLY_DELETED_FAILURE,
} from 'constants/actionTypes/deletedData';
import { ADMIN_API_URL } from 'config';

export const fetchRecentlyDeletedRequest = () => ({
    type: ADMIN_FETCH_RECENTLY_DELETED_REQUEST,
});

export const fetchRecentlyDeletedSuccess = payload => ({
    type: ADMIN_FETCH_RECENTLY_DELETED_SUCCESS,
    payload,
});

export const fetchRecentlyDeletedFailure = error => ({
    type: ADMIN_FETCH_RECENTLY_DELETED_FAILURE,
    error,
});

export default (
        postbody = {
            pageSize: 25,
            pageNumber: 1,
            searchTerm: '',
        },
    ) =>
    dispatch => {
        dispatch(fetchRecentlyDeletedRequest());

        axios
            .post(`${ADMIN_API_URL}/deleted`, postbody, getHeaders())
            .then(res => dispatch(fetchRecentlyDeletedSuccess(res.data)))
            .catch(err => dispatch(fetchRecentlyDeletedFailure(err.message)));
    };
