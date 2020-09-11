import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_FEATURE_REQUEST,
    EDIT_FEATURE_SUCCESS,
    EDIT_FEATURE_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';
import { ADMIN_API_URL } from 'config';

export const editFeatureRequest = () => ({
    type: EDIT_FEATURE_REQUEST,
});

export const editFeatureSuccess = payload => ({
    type: EDIT_FEATURE_SUCCESS,
    payload,
});

export const editFeatureFailure = error => ({
    type: EDIT_FEATURE_FAILURE,
    error,
});

export default (postBody, id) => dispatch => {
    dispatch(editFeatureRequest());
    axios
        .put(`${ADMIN_API_URL}/recentUpdates/${id}`, postBody, getHeaders())
        .then(result => dispatch(editFeatureSuccess(result.data)))
        .catch(error => {
            dispatch(editFeatureFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
