import axios from 'axios';

import { ADMIN_API_URL } from 'config';

import { getHeaders } from 'helpers/api';
import {
    DELETE_FEATURE_REQUEST,
    DELETE_FEATURE_SUCCESS,
    DELETE_FEATURE_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';

export const deleteFeatureRequest = () => ({
    type: DELETE_FEATURE_REQUEST,
});

export const deleteFeatureSuccess = id => ({
    type: DELETE_FEATURE_SUCCESS,
    success: true,
    id,
});

export const deleteFeatureFailure = error => ({
    type: DELETE_FEATURE_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(deleteFeatureRequest());
    return axios
        .delete(`${ADMIN_API_URL}/recentUpdates/${id}`, getHeaders())
        .then(() => dispatch(deleteFeatureSuccess(id)))
        .catch(err => dispatch(deleteFeatureFailure(err.message)));
};
