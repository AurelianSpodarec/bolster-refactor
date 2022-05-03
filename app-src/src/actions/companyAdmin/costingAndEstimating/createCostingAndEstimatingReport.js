import axios from 'axios';

import {
    CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST,
    CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS,
    CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE,
} from 'constants/actionTypes/costingAndEstimating';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const createCostingAndEstimatingReportRequest = () => ({
    type: CREATE_COSTING_AND_ESTIMATING_REPORT_REQUEST,
});

export const createCostingAndEstimatingReportSuccess = payload => ({
    type: CREATE_COSTING_AND_ESTIMATING_REPORT_SUCCESS,
    payload,
});

export const createCostingAndEstimatingReportFailure = error => ({
    type: CREATE_COSTING_AND_ESTIMATING_REPORT_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createCostingAndEstimatingReportRequest());

    return axios
        .post(`${API_URL}/costingandestimating/report`, postBody, getHeaders())
        .then(res => {
            dispatch(createCostingAndEstimatingReportSuccess(res.data));
        })
        .catch(err => {
            dispatch(createCostingAndEstimatingReportFailure(err.message));
        });
};
