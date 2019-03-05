import axios from 'axios';

import {
    FETCH_CREDIT_LOGS_REQUEST,
    FETCH_CREDIT_LOGS_SUCCESS,
    FETCH_CREDIT_LOGS_FAILURE
} from 'constants/actionTypes/creditLogs';

export const fetchCreditLogsRequest = () => ({
    type: FETCH_CREDIT_LOGS_REQUEST
});

export const fetchCreditLogsSuccess = payload => ({
    type: FETCH_CREDIT_LOGS_SUCCESS,
    payload
});

export const fetchCreditLogsFailure = error => ({
    type: FETCH_CREDIT_LOGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchCreditLogsRequest());

    axios
        .get('/mockData/creditLogs/creditLogs.json')
        .then(res => dispatch(fetchCreditLogsSuccess(res.data)))
        .catch(err => dispatch(fetchCreditLogsFailure(err)));
};
