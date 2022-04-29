import axios from 'axios';

import {
    FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCostingAndEstimatingDataRequest = () => ({
    type: FETCH_COSTING_AND_ESTIMATING_DATA_REQUEST,
});

export const fetchCostingAndEstimatingDataSuccess = payload => ({
    type: FETCH_COSTING_AND_ESTIMATING_DATA_SUCCESS,
    payload,
});

export const fetchCostingAndEstimatingDataFailure = error => ({
    type: FETCH_COSTING_AND_ESTIMATING_DATA_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(fetchCostingAndEstimatingDataRequest());

    return axios
        .post(`${API_URL}/costingandestimating/costingandestimating`, postBody, getHeaders())
        .then(res => dispatch(fetchCostingAndEstimatingDataSuccess(res.data)))
        .catch(err => dispatch(fetchCostingAndEstimatingDataFailure(err.message)));
};
