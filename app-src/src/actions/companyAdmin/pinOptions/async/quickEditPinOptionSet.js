import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    QUICK_EDIT_OPTION_SET_REQUEST,
    QUICK_EDIT_OPTION_SET_SUCCESS,
    QUICK_EDIT_OPTION_SET_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const editPinOptionSetRequest = () => ({
    type: QUICK_EDIT_OPTION_SET_REQUEST,
});

export const editPinOptionSetSuccess = payload => ({
    type: QUICK_EDIT_OPTION_SET_SUCCESS,
    payload,
});

export const editPinOptionSetFailure = error => ({
    type: QUICK_EDIT_OPTION_SET_FAILURE,
    error,
});

export default (id, postBody) => async dispatch => {
    dispatch(editPinOptionSetRequest());

    return axios
        .patch(`${API_URL}/pinoptions/sets/${id}/quickedit`, postBody, getHeaders())
        .then(res => dispatch(editPinOptionSetSuccess(res.data)))
        .catch(err => {
            dispatch(handleErrors(editPinOptionSetFailure)(err));
        });
};
