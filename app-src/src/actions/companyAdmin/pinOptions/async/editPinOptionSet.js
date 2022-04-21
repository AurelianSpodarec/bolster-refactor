import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    EDIT_PIN_OPTION_SET_REQUEST,
    EDIT_PIN_OPTION_SET_SUCCESS,
    EDIT_PIN_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const editPinOptionSetRequest = () => ({
    type: EDIT_PIN_OPTION_SET_REQUEST,
});

export const editPinOptionSetSuccess = payload => ({
    type: EDIT_PIN_OPTION_SET_SUCCESS,
    payload,
});

export const editPinOptionSetFailure = error => ({
    type: EDIT_PIN_OPTION_SET_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(editPinOptionSetRequest());

    return axios
        .patch(`${API_URL}/pinoptions/sets/${id}`, postBody, getHeaders())
        .then(res => dispatch(editPinOptionSetSuccess(res.data)))
        .catch(err => {
            dispatch(handleErrors(editPinOptionSetFailure)(err));
        });
};
