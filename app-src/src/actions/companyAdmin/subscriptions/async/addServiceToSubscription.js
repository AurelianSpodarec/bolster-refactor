import {
    ADD_SERVICE_TO_SUBSCRIPTION_REQUEST,
    ADD_SERVICE_TO_SUBSCRIPTION_SUCCESS,
    ADD_SERVICE_TO_SUBSCRIPTION_FAILURE
} from 'constants/actionTypes/subscriptions';
import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

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

    return axios
        .post(`${API_URL}/subscriptions`, postBody, getHeaders())
        .then(({ data }) => dispatch(addServiceToSubscriptionSuccess(data)))
        .catch(err => {
            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
            // pulls out nested API error if existing
            return dispatch(
                addServiceToSubscriptionFailure(
                    err.response.data.ServiceIDs
                        ? err.response.data.ServiceIDs[0]
                        : err.message
                )
            );
        });
};
