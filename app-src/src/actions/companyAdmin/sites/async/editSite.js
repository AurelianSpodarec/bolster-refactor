import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_SITE_REQUEST,
    EDIT_SITE_SUCCESS,
    EDIT_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const editSiteRequest = () => ({
    type: EDIT_SITE_REQUEST
});

export const editSiteSuccess = payload => ({
    type: EDIT_SITE_SUCCESS,
    payload
});

export const editSiteFailure = error => ({
    type: EDIT_SITE_FAILURE,
    error
});

export default (siteID, postBody) => dispatch => {
    dispatch(editSiteRequest());

    axios
        .post(`${API_URL}/sites/${siteID}`, postBody, getHeaders())
        .then(result => dispatch(editSiteSuccess(result.data)))
        .catch(error => {
            dispatch(editSiteFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
