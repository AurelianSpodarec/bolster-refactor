import axios from 'axios';

import {
    FETCH_COSTING_AND_ESTIMATING_FILTERS_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_FILTERS_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_FILTERS_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCostingAndEstimatingCartRequest = () => ({
    type: FETCH_COSTING_AND_ESTIMATING_FILTERS_REQUEST,
});

export const fetchCostingAndEstimatingCartSuccess = payload => ({
    type: FETCH_COSTING_AND_ESTIMATING_FILTERS_SUCCESS,
    payload,
});

export const fetchCostingAndEstimatingCartFailure = error => ({
    type: FETCH_COSTING_AND_ESTIMATING_FILTERS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(fetchCostingAndEstimatingCartRequest());

    return axios
        .post(`${API_URL}/costingandestimating/filters`, postBody, getHeaders())
        .then(res => {
            dispatch(fetchCostingAndEstimatingCartSuccess(res.data));
        })
        .catch(err => dispatch(fetchCostingAndEstimatingCartFailure(err.message)));
};
