import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_PIN_REQUEST,
    CLIENT_FETCH_SINGLE_PIN_SUCCESS,
    CLIENT_FETCH_SINGLE_PIN_FAILURE
} from 'constants/client/actionTypes/clientPins';

export const clientFetchSinglePinRequest = () => ({
    type: CLIENT_FETCH_SINGLE_PIN_REQUEST
});

export const clientFetchSinglePinSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_PIN_SUCCESS,
    payload
});

export const clientFetchSinglePinFailure = error => ({
    type: CLIENT_FETCH_SINGLE_PIN_FAILURE,
    error
});

export default (companyID, pinID) => dispatch => {
    dispatch(clientFetchSinglePinRequest());

    return (
        axios

            // ! change this url
            .get(`${CLIENT_API_URL}/pins/${companyID}/${pinID}`, getHeaders())
            .then(res => dispatch(clientFetchSinglePinSuccess(res.data)))
            .catch(err => dispatch(clientFetchSinglePinFailure(err.message)))
    );
};
