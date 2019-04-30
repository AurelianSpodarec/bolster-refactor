import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
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
        .catch(err => dispatch(handleErrors(postCustomFiltersFailure)(err)));
};
