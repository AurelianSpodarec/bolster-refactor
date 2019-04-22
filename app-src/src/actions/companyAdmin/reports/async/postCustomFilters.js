import axios from 'axios';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    POST_CUSTOM_FILTERS_REQUEST,
    POST_CUSTOM_FILTERS_SUCCESS,
    POST_CUSTOM_FILTERS_FAILURE
} from 'constants/actionTypes/reports';

export const postCustomFiltersRequest = () => ({
    type: POST_CUSTOM_FILTERS_REQUEST
});

export const postCustomFiltersSuccess = payload => ({
    type: POST_CUSTOM_FILTERS_SUCCESS,
    payload
});

export const postCustomFiltersFailure = error => ({
    type: POST_CUSTOM_FILTERS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(postCustomFiltersRequest());

    return axios
        .post(`${API_URL}/reports/filters`, postBody, getHeaders())
        .then(res => dispatch(postCustomFiltersSuccess(res.data)))
        .catch(error => {
            dispatch(postCustomFiltersFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
