import axios from 'axios';

import {
    ADMIN_RESTORE_RECENTLY_DELETED_REQUEST,
    ADMIN_RESTORE_RECENTLY_DELETED_SUCCESS,
    ADMIN_RESTORE_RECENTLY_DELETED_FAILURE,
} from 'constants/actionTypes/deletedData';

import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreRecentlyDeletedRequest = () => ({
    type: ADMIN_RESTORE_RECENTLY_DELETED_REQUEST,
});

export const restoreRecentlyDeletedSuccess = restoreURI => ({
    type: ADMIN_RESTORE_RECENTLY_DELETED_SUCCESS,
    restoreURI,
});

export const restoreRecentlyDeletedFailure = error => ({
    type: ADMIN_RESTORE_RECENTLY_DELETED_FAILURE,
    error,
});

export default restoreURI => dispatch => {
    dispatch(restoreRecentlyDeletedRequest());
    return axios
        .delete(`${ADMIN_API_URL}${restoreURI}`, getHeaders())
        .then(() => dispatch(restoreRecentlyDeletedSuccess(restoreURI)))
        .catch(err => dispatch(restoreRecentlyDeletedFailure(err.message)));
};
