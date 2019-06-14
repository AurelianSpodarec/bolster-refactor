import axios from 'axios';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_PIN_OPERATIVES_REQUEST,
    CLIENT_FETCH_PIN_OPERATIVES_SUCCESS,
    CLIENT_FETCH_PIN_OPERATIVES_FAILURE
} from 'constants/client/actionTypes/clientPinOperatives';

export const clientFetchPinOperativesRequest = () => ({
    type: CLIENT_FETCH_PIN_OPERATIVES_REQUEST
});

export const clientFetchPinOperativesSuccess = payload => ({
    type: CLIENT_FETCH_PIN_OPERATIVES_SUCCESS,
    payload
});

export const clientFetchPinOperativesFailure = error => ({
    type: CLIENT_FETCH_PIN_OPERATIVES_FAILURE,
    error
});

export default (companyID, pinID) => dispatch => {
    dispatch(clientFetchPinOperativesRequest(companyID, pinID));

    return axios
        .get(
            `${CLIENT_API_URL}/pins/${companyID}/${pinID}/operatives`,
            getHeaders()
        )
        .then(res => dispatch(clientFetchPinOperativesSuccess(res.data)))
        .catch(error => {
            dispatch(clientFetchPinOperativesFailure(error.message));
        });
};
