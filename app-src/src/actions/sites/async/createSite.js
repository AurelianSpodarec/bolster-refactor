import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_SITE_REQUEST,
    CREATE_SITE_SUCCESS,
    CREATE_SITE_FAILURE
} from 'constants/actionTypes/sites';

export const addSiteRequest = () => ({
    type: CREATE_SITE_REQUEST
});

export const addSiteSuccess = payload => ({
    type: CREATE_SITE_SUCCESS,
    payload
});

export const addSiteFailure = error => ({
    type: CREATE_SITE_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(addSiteRequest());

    axios
        .post(`${API_URL}/sites`, postBody, getHeaders())
        .then(result => dispatch(addSiteSuccess(result.data)))
        .catch(error => {
            dispatch(addSiteFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
