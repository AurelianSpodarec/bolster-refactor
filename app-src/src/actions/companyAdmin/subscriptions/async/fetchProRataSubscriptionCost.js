import axios from 'axios';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PRO_RATA_SUBSCRIPTION_COST_REQUEST,
    FETCH_PRO_RATA_SUBSCRIPTION_COST_SUCCESS,
    FETCH_PRO_RATA_SUBSCRIPTION_COST_FAILURE
} from 'constants/actionTypes/subscriptions';
import { API_URL } from 'config';

export const fetchProRataSubscriptionCostRequest = () => ({
    type: FETCH_PRO_RATA_SUBSCRIPTION_COST_REQUEST
});

export const fetchProRataSubscriptionCostSuccess = payload => ({
    type: FETCH_PRO_RATA_SUBSCRIPTION_COST_SUCCESS,
    payload
});

export const fetchProRataSubscriptionCostFailure = error => ({
    type: FETCH_PRO_RATA_SUBSCRIPTION_COST_FAILURE,
    error
});

export default numberOfServices => dispatch => {
    dispatch(fetchProRataSubscriptionCostRequest());

    return axios
        .get(
            `${API_URL}/subscriptions/proratacost?numberOfServices=${numberOfServices}`,
            getHeaders()
        )
        .then(res => dispatch(fetchProRataSubscriptionCostSuccess(res.data)))
        .catch(err => dispatch(fetchProRataSubscriptionCostFailure(err.message)));
};
