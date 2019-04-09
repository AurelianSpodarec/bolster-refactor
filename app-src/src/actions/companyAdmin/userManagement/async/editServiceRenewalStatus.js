import {
    EDIT_SERVICE_RENEWAL_STATUS_REQUEST,
    EDIT_SERVICE_RENEWAL_STATUS_SUCCESS,
    EDIT_SERVICE_RENEWAL_STATUS_FAILURE
} from 'constants/actionTypes/subscriptions';
import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

export const editServiceRenewalStatusRequest = () => ({
    type: EDIT_SERVICE_RENEWAL_STATUS_REQUEST
});

export const editServiceRenewalStatusSuccess = payload => ({
    type: EDIT_SERVICE_RENEWAL_STATUS_SUCCESS,
    payload
});

export const editServiceRenewalStatusFailure = error => ({
    type: EDIT_SERVICE_RENEWAL_STATUS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(editServiceRenewalStatusRequest());
    console.log(postBody);
    axios
        .post(
            `${API_URL}/subscriptions/service/renewal`,
            postBody,
            getHeaders()
        )
        .then(({ data }) => dispatch(editServiceRenewalStatusSuccess(data)))
        .catch(err => {
            const errorAction = handleErrors(editServiceRenewalStatusFailure);
            dispatch(errorAction(err));
        });
};
