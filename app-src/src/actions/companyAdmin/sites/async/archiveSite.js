import axios from 'axios';

import {
    ARCHIVE_SITE_REQUEST,
    ARCHIVE_SITE_SUCCESS,
    ARCHIVE_SITE_FAILURE
} from 'constants/actionTypes/sites';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const archiveSiteRequest = () => ({
    type: ARCHIVE_SITE_REQUEST
});

export const archiveSiteSuccess = id => ({
    type: ARCHIVE_SITE_SUCCESS,
    id
});

export const archiveSiteFailure = error => ({
    type: ARCHIVE_SITE_FAILURE,
    error
});

export default siteID => dispatch => {
    dispatch(archiveSiteRequest());
    return axios
        .post(`${API_URL}/sites/${siteID}`, null, getHeaders())
        .then(() => dispatch(archiveSiteSuccess(siteID)))
        .catch(err => dispatch(archiveSiteFailure(err.message)));
};
