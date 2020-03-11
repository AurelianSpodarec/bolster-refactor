import axios from 'axios';

import { API_URL } from 'config/index';
import { getHeaders, handleErrors } from 'helpers/api';
import {
    CREATE_PIN_REQUEST,
    CREATE_PIN_SUCCESS,
    CREATE_PIN_FAILURE
} from 'constants/actionTypes/pins';

export const addPinRequest = () => ({
    type: CREATE_PIN_REQUEST
});

export const addPinSuccess = payload => ({
    type: CREATE_PIN_SUCCESS,
    payload
});

export const addPinFailure = error => ({
    type: CREATE_PIN_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(addPinRequest());

    axios
        .post(`${API_URL}/pins`, postBody, getHeaders())
        .then(result => dispatch(addPinSuccess(result.data)))
        .catch(err => handleErrors(addPinFailure)(err));
};
