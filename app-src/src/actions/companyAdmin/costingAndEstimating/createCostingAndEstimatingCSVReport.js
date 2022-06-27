import axios from 'axios';

import {
    CREATE_COSTING_AND_ESTIMATING_WITH_CSV_REPORT_FAILURE,
    CREATE_COSTING_AND_ESTIMATING_WITH_CSV_REPORT_REQUEST,
    CREATE_COSTING_AND_ESTIMATING_WITH_CSV_REPORT_SUCCESS,
} from 'constants/actionTypes/costingAndEstimating';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const createCostingAndEstimatingCSVReportRequest = () => ({
    type: CREATE_COSTING_AND_ESTIMATING_WITH_CSV_REPORT_REQUEST,
});

export const createCostingAndEstimatingCSVReportSuccess = payload => ({
    type: CREATE_COSTING_AND_ESTIMATING_WITH_CSV_REPORT_SUCCESS,
    payload,
});

export const createCostingAndEstimatingCSVReportFailure = error => ({
    type: CREATE_COSTING_AND_ESTIMATING_WITH_CSV_REPORT_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(createCostingAndEstimatingCSVReportRequest());

    return axios
        .post(`${API_URL}/costingandestimating/csv`, postBody, getHeaders())
        .then(res => {
            if (res.status === 202) {
                throw new Error(res.data?.message ?? 'Something went wrong');
            }
            dispatch(createCostingAndEstimatingCSVReportSuccess(res.data));
        })
        .catch(err => {
            dispatch(createCostingAndEstimatingCSVReportFailure(err.message));
        });
};
