import axios from 'axios';

import {
    RESTORE_RECENTLY_DELETED_REQUEST,
    RESTORE_RECENTLY_DELETED_SUCCESS,
    RESTORE_RECENTLY_DELETED_FAILURE,
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreRecentlyDeletedRequest = () => ({
    type: RESTORE_RECENTLY_DELETED_REQUEST,
});

export const restoreRecentlyDeletedSuccess = restoreURI => ({
    type: RESTORE_RECENTLY_DELETED_SUCCESS,
    restoreURI,
});

export const restoreRecentlyDeletedFailure = error => ({
    type: RESTORE_RECENTLY_DELETED_FAILURE,
    error,
});

export default restoreURI => dispatch => {
    dispatch(restoreRecentlyDeletedRequest());
    return axios
        .delete(`${API_URL}${restoreURI}`, getHeaders())
        .then(() => dispatch(restoreRecentlyDeletedSuccess(restoreURI)))
        .catch(err => dispatch(restoreRecentlyDeletedFailure(err.message)));
};
