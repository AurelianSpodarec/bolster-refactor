import {
    ADD_SERVICE_TO_SUBSCRIPTION_REQUEST,
    ADD_SERVICE_TO_SUBSCRIPTION_SUCCESS,
    ADD_SERVICE_TO_SUBSCRIPTION_FAILURE
} from 'constants/actionTypes/subscriptions';
import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const addServiceToSubscriptionRequest = () => ({
    type: ADD_SERVICE_TO_SUBSCRIPTION_REQUEST
});

export const addServiceToSubscriptionSuccess = payload => ({
    type: ADD_SERVICE_TO_SUBSCRIPTION_SUCCESS,
    payload
});

export const addServiceToSubscriptionFailure = error => ({
    type: ADD_SERVICE_TO_SUBSCRIPTION_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(addServiceToSubscriptionRequest());
    axios
        .post(`${API_URL}/subscriptions/`, postBody, getHeaders())
        .then(({ data }) => dispatch(addServiceToSubscriptionSuccess(data)))
        .catch(err => {
            const errorAction = handleErrors(addServiceToSubscriptionFailure);
            dispatch(errorAction(err));
        });
};
