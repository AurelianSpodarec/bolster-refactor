import axios from 'axios';

import {
    FETCH_SINGLE_FEATURE_REQUEST,
    FETCH_SINGLE_FEATURE_SUCCESS,
    FETCH_SINGLE_FEATURE_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchSingleFeatureRequest = () => ({
    type: FETCH_SINGLE_FEATURE_REQUEST,
});

export const fetchSingleFeatureSuccess = payload => ({
    type: FETCH_SINGLE_FEATURE_SUCCESS,
    payload,
});

export const fetchSingleFeatureFailure = error => ({
    type: FETCH_SINGLE_FEATURE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchSingleFeatureRequest());

    return axios
        .get(`${ADMIN_API_URL}/recentUpdates/${id}`, getHeaders())
        .then(({ data }) => dispatch(fetchSingleFeatureSuccess(data)))
        .catch(err => dispatch(fetchSingleFeatureFailure(err.message)));
};
