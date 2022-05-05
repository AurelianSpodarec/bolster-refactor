import axios from 'axios';

import { API_URL } from 'config/index';
import {
    DELETE_CUSTOM_PRELIM_FAILURE,
    DELETE_CUSTOM_PRELIM_REQUEST,
    DELETE_CUSTOM_PRELIM_SUCCESS,
} from 'constants/actionTypes/prelims';
import { getHeaders } from 'helpers/api';

export const deleteCustomPrelimRequest = () => ({
    type: DELETE_CUSTOM_PRELIM_REQUEST,
});

export const deleteCustomPrelimSuccess = id => ({
    type: DELETE_CUSTOM_PRELIM_SUCCESS,
    id,
});

export const deleteCustomPrelimFailure = error => ({
    type: DELETE_CUSTOM_PRELIM_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(deleteCustomPrelimRequest());

    return axios
        .post(`${API_URL}/CostingAndEstimating/DeleteCustomPrelim`, postBody, getHeaders())
        .then(() => dispatch(deleteCustomPrelimSuccess(postBody.prelimID)))
        .catch(error => dispatch(deleteCustomPrelimFailure(error)));
};
