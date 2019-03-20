import axios from 'axios';
import { API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    CREATE_SITE_REQUEST,
    CREATE_SITE_SUCCESS,
    CREATE_SITE_FAILURE
} from 'constants/index';

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
        .post(`${API_URL}/sites`, { postBody }, getHeaders())
        .then(result => dispatch(addSiteSuccess(result.data)))
        .catch(error => dispatch(addSiteFailure(error)));
};
