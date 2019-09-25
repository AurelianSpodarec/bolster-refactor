import axios from 'axios';

import {
    RESTORE_SITE_REQUEST,
    RESTORE_SITE_SUCCESS,
    RESTORE_SITE_FAILURE
} from 'constants/actionTypes/deletedData';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const restoreSiteRequest = () => ({
    type: RESTORE_SITE_REQUEST
});

export const restoreSiteSuccess = id => ({
    type: RESTORE_SITE_SUCCESS,
    id
});

export const restoreSiteFailure = error => ({
    type: RESTORE_SITE_FAILURE,
    error
});

export default siteID => dispatch => {
    dispatch(restoreSiteRequest());
    return axios
        .delete(`${API_URL}/sites/${siteID}?undo=true`, getHeaders())
        .then(() => dispatch(restoreSiteSuccess(siteID)))
        .catch(err => dispatch(restoreSiteFailure(err.message)));
};
