import axios from 'axios';

import {
    DELETE_SITE_REQUEST,
    DELETE_SITE_SUCCESS,
    DELETE_SITE_FAILURE
} from 'constants/actionTypes/sites';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const deleteSiteRequest = () => ({
    type: DELETE_SITE_REQUEST
});

export const deleteSiteSuccess = id => ({
    type: DELETE_SITE_SUCCESS,
    id
});

export const deleteSiteFailure = error => ({
    type: DELETE_SITE_FAILURE,
    error
});

export default siteID => dispatch => {
    dispatch(deleteSiteRequest());
    return axios
        .delete(`${API_URL}/sites/${siteID}`, getHeaders())
        .then(() => dispatch(deleteSiteSuccess(siteID)))
        .catch(err => dispatch(deleteSiteFailure(err.message)));
};
