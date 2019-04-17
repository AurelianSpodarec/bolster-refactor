import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    MOVE_PIN_REQUEST,
    MOVE_PIN_SUCCESS,
    MOVE_PIN_FAILURE
} from 'constants/actionTypes/pins';

export const movePinRequest = () => ({
    type: MOVE_PIN_REQUEST
});

export const movePinSuccess = payload => ({
    type: MOVE_PIN_SUCCESS,
    payload
});

export const movePinFailure = error => ({
    type: MOVE_PIN_FAILURE,
    error
});

export default (pinID, postBody) => dispatch => {
    dispatch(movePinRequest());

    return axios
        .post(`${API_URL}/pins/${pinID}/move`, postBody, getHeaders())
        .then(result => dispatch(movePinSuccess(result.data)))
        .catch(error => {
            dispatch(movePinFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
