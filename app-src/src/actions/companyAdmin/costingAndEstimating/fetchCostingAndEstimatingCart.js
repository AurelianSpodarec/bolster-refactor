import axios from 'axios';

import {
    FETCH_COSTING_AND_ESTIMATING_CART_REQUEST,
    FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS,
    FETCH_COSTING_AND_ESTIMATING_CART_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchCostingAndEstimatingCartRequest = () => ({
    type: FETCH_COSTING_AND_ESTIMATING_CART_REQUEST,
});

export const fetchCostingAndEstimatingCartSuccess = payload => ({
    type: FETCH_COSTING_AND_ESTIMATING_CART_SUCCESS,
    payload,
});

export const fetchCostingAndEstimatingCartFailure = error => ({
    type: FETCH_COSTING_AND_ESTIMATING_CART_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchCostingAndEstimatingCartRequest());

    return axios
        .get(`${API_URL}/costingandestimating/costingcart`, getHeaders()) // TODO - change me
        .then(res => dispatch(fetchCostingAndEstimatingCartSuccess(res.data)))
        .catch(err => dispatch(fetchCostingAndEstimatingCartFailure(err.message)));
};
