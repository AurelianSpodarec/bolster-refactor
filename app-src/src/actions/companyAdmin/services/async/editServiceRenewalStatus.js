import {
    EDIT_SERVICE_RENEWAL_STATUS_REQUEST,
    EDIT_SERVICE_RENEWAL_STATUS_SUCCESS,
    EDIT_SERVICE_RENEWAL_STATUS_FAILURE
} from 'constants/actionTypes/services';
import axios from 'axios';

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

export default (postbody => dispatch => ({
    dispatch(editServiceRenewalStatusRequest());

    axios
}));
