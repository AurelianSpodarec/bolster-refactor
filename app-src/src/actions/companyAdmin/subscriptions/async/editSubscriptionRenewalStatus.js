import {
    EDIT_SUBSCRIPTION_RENEWAL_STATUS_REQUEST,
    EDIT_SUBSCRIPTION_RENEWAL_STATUS_SUCCESS,
    EDIT_SUBSCRIPTION_RENEWAL_STATUS_FAILURE
} from 'constants/actionTypes/subscriptions';
import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const editSubscriptionRenewalStatusRequest = () => ({
    type: EDIT_SUBSCRIPTION_RENEWAL_STATUS_REQUEST
});

export const editSubscriptionRenewalStatusSuccess = payload => ({
    type: EDIT_SUBSCRIPTION_RENEWAL_STATUS_SUCCESS,
    payload
});

export const editSubscriptionRenewalStatusFailure = error => ({
    type: EDIT_SUBSCRIPTION_RENEWAL_STATUS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(editSubscriptionRenewalStatusRequest());
    axios
        .post(`${API_URL}/subscriptions/renewal`, postBody, getHeaders())
        .then(({ data }) =>
            dispatch(editSubscriptionRenewalStatusSuccess(data))
        )
        .catch(err => {
            const errorAction = handleErrors(
                editSubscriptionRenewalStatusFailure
            );
            dispatch(errorAction(err));
        });
};
