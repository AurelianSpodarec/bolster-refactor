import axios from 'axios';

import {
    FETCH_ALL_NEW_FEATURES_REQUEST,
    FETCH_ALL_NEW_FEATURES_SUCCESS,
    FETCH_ALL_NEW_FEATURES_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchNewFeaturesRequest = () => ({
    type: FETCH_ALL_NEW_FEATURES_REQUEST,
});

export const fetchNewFeaturesSuccess = payload => ({
    type: FETCH_ALL_NEW_FEATURES_SUCCESS,
    payload,
});

export const fetchNewFeaturesFailure = error => ({
    type: FETCH_ALL_NEW_FEATURES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchNewFeaturesRequest());

    return axios
        .get(`${ADMIN_API_URL}/recentUpdates`, getHeaders())
        .then(({ data }) => dispatch(fetchNewFeaturesSuccess(data)))
        .catch(err => dispatch(fetchNewFeaturesFailure(err.message)));
};
