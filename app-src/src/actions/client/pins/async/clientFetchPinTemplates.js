import axios from 'axios';

import { CLIENT_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_PIN_TEMPLATES_REQUEST,
    CLIENT_FETCH_PIN_TEMPLATES_SUCCESS,
    CLIENT_FETCH_PIN_TEMPLATES_FAILURE
} from 'constants/client/actionTypes/clientPins';

export const clientFetchPinTemplatesRequest = () => ({
    type: CLIENT_FETCH_PIN_TEMPLATES_REQUEST
});

export const clientFetchPinTemplatesSuccess = payload => ({
    type: CLIENT_FETCH_PIN_TEMPLATES_SUCCESS,
    payload
});

export const clientFetchPinTemplatesFailure = error => ({
    type: CLIENT_FETCH_PIN_TEMPLATES_FAILURE,
    error
});

export default (companyID, drawingID) => dispatch => {
    dispatch(clientFetchPinTemplatesRequest());

    axios
        .get(
            `${CLIENT_API_URL}/pins/${companyID}/${drawingID}/templates`,
            getHeaders()
        )
        .then(res => dispatch(clientFetchPinTemplatesSuccess(res.data)))
        .catch(err => dispatch(clientFetchPinTemplatesFailure(err.message)));
};
