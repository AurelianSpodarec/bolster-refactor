import axios from 'axios';
import { getHeaders } from 'helpers/api';
import {
    FETCH_ALL_SUBSCRIPTIONS_REQUEST,
    FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    FETCH_ALL_SUBSCRIPTIONS_FAILURE
} from 'constants/actionTypes/subscriptions';
import { API_URL } from 'config';

export const fetchAllSubscriptionsRequest = () => ({
    type: FETCH_ALL_SUBSCRIPTIONS_REQUEST
});

export const fetchAllSubscriptionsSuccess = payload => ({
    type: FETCH_ALL_SUBSCRIPTIONS_SUCCESS,
    payload
});

export const fetchAllSubscriptionsFailure = error => ({
    type: FETCH_ALL_SUBSCRIPTIONS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchAllSubscriptionsRequest());

    axios
        .get(`${API_URL}/subscriptions/active`, getHeaders())
        .then(res => dispatch(fetchAllSubscriptionsSuccess(res.data)))
        .catch(err => dispatch(fetchAllSubscriptionsFailure(err.message)));
};
