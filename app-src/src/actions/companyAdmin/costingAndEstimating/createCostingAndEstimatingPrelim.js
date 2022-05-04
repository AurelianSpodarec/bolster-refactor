import axios from 'axios';

import {
    CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
} from 'constants/actionTypes/prelims';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const createCostingAndEstimatingPrelimRequest = () => ({
    type: CREATE_COSTING_AND_ESTIMATING_PRELIM_REQUEST,
});

export const createCostingAndEstimatingPrelimSuccess = payload => ({
    type: CREATE_COSTING_AND_ESTIMATING_PRELIM_SUCCESS,
    payload,
});

export const createCostingAndEstimatingPrelimFailure = error => ({
    type: CREATE_COSTING_AND_ESTIMATING_PRELIM_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createCostingAndEstimatingPrelimRequest());

    return axios
        .post(`${API_URL}/costingandestimating/createprelim`, postBody, getHeaders())
        .then(res => {
            dispatch(createCostingAndEstimatingPrelimSuccess(res.data));
        })
        .catch(err => {
            dispatch(createCostingAndEstimatingPrelimFailure(err.message));
        });
};
