import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS,
    EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE,
} from 'constants/actionTypes/bolsterPlus';

export const editBolsterPlusRenewalStatusRequest = () => ({
    type: EDIT_BOLSTER_PLUS_RENEWAL_STATUS_REQUEST,
});

export const editBolsterPlusRenewalStatusSuccess = payload => ({
    type: EDIT_BOLSTER_PLUS_RENEWAL_STATUS_SUCCESS,
    payload,
});

export const editBolsterPlusRenewalStatusFailure = error => ({
    type: EDIT_BOLSTER_PLUS_RENEWAL_STATUS_FAILURE,
    error,
});

export default postBody => dispatch => {
    dispatch(editBolsterPlusRenewalStatusRequest());
    axios
        .post(`${API_URL}/addon/renewal`, postBody, getHeaders())
        .then(({ data }) => dispatch(editBolsterPlusRenewalStatusSuccess(data)))
        .catch(err => {
            const errorAction = handleErrors(editBolsterPlusRenewalStatusFailure);
            dispatch(errorAction(err));
        });
};
