import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    ADD_NEW_FEATURE_REQUEST,
    ADD_NEW_FEATURE_SUCCESS,
    ADD_NEW_FEATURE_FAILURE,
} from 'constants/actionTypes/superAdminNewFeatures';
import { ADMIN_API_URL } from 'config';

export const addNewFeatureRequest = () => ({
    type: ADD_NEW_FEATURE_REQUEST,
});

export const addNewFeatureSuccess = payload => ({
    type: ADD_NEW_FEATURE_SUCCESS,
    payload,
});

export const addNewFeatureFailure = error => ({
    type: ADD_NEW_FEATURE_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(addNewFeatureRequest());

    axios
        .post(`${ADMIN_API_URL}/recentUpdates`, postBody, getHeaders())
        .then(result => dispatch(addNewFeatureSuccess(result.data)))
        .catch(error => {
            dispatch(addNewFeatureFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
