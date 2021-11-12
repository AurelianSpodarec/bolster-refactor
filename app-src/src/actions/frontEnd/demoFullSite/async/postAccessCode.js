import axios from 'axios';

import {
    POST_DEMO_FULL_SITE_REQUEST,
    POST_DEMO_FULL_SITE_SUCCESS,
    POST_DEMO_FULL_SITE_FAILURE,
} from 'constants/actionTypes/demoAccessCodes';

import { getHeaders } from 'helpers/api';
import { FRONTEND_API_URL } from 'config';

export const postDemoFullSiteRequest = () => ({
    type: POST_DEMO_FULL_SITE_REQUEST,
});

export const postDemoFullSiteSuccess = payload => ({
    type: POST_DEMO_FULL_SITE_SUCCESS,
    payload,
});

export const postDemoFullSiteFailure = error => ({
    type: POST_DEMO_FULL_SITE_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(postDemoFullSiteRequest());

    return axios
        .post(`${FRONTEND_API_URL}/demo`, postBody, getHeaders())
        .then(res => dispatch(postDemoFullSiteSuccess(res.data)))
        .catch(err => dispatch(postDemoFullSiteFailure(err.message)));
};
