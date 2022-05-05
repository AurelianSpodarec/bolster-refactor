import axios from 'axios';

import {
    FETCH_COSTING_AND_ESTIMATING_RESULTS_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_RESULTS_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_RESULTS_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCostingAndEstimatingResultsRequest = () => ({
    type: FETCH_COSTING_AND_ESTIMATING_RESULTS_REQUEST,
});

export const fetchCostingAndEstimatingResultsSuccess = payload => ({
    type: FETCH_COSTING_AND_ESTIMATING_RESULTS_SUCCESS,
    payload,
});

export const fetchCostingAndEstimatingResultsFailure = error => ({
    type: FETCH_COSTING_AND_ESTIMATING_RESULTS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(fetchCostingAndEstimatingResultsRequest());

    return axios
        .post(`${API_URL}/costingandestimating/results`, postBody, getHeaders())
        .then(res => dispatch(fetchCostingAndEstimatingResultsSuccess(res.data)))
        .catch(err => dispatch(fetchCostingAndEstimatingResultsFailure(err.message)));
};
