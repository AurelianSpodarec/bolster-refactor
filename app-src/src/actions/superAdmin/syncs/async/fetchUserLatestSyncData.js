import {
    FETCH_USER_LATEST_SYNC_DATA_REQUEST,
    FETCH_USER_LATEST_SYNC_DATA_SUCCESS,
    FETCH_USER_LATEST_SYNC_DATA_FAILURE,
} from 'constants/actionTypes/syncs';
import axios from 'axios';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchUserLatestSyncDataRequest = () => ({
    type: FETCH_USER_LATEST_SYNC_DATA_REQUEST,
});

export const fetchUserLatestSyncDataSuccess = payload => ({
    type: FETCH_USER_LATEST_SYNC_DATA_SUCCESS,
    payload,
});

export const fetchUserLatestSyncDataFailure = error => ({
    type: FETCH_USER_LATEST_SYNC_DATA_FAILURE,
    error,
});

export default ({ id }) =>
    dispatch => {
        dispatch(fetchUserLatestSyncDataRequest());

        axios
            .get(`${ADMIN_API_URL}/sync/${id}`, getHeaders())
            .then(res => dispatch(fetchUserLatestSyncDataSuccess(res.data)))
            .catch(err => dispatch(fetchUserLatestSyncDataFailure(err.message)));
    };
