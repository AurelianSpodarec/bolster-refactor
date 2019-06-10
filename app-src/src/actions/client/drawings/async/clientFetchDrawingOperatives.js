import axios from 'axios';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';

import {
    CLIENT_FETCH_DRAWING_OPERATIVES_REQUEST,
    CLIENT_FETCH_DRAWING_OPERATIVES_SUCCESS,
    CLIENT_FETCH_DRAWING_OPERATIVES_FAILURE
} from 'constants/client/actionTypes/clientDrawingOperatives';

export const clientFetchDrawingOperativesRequest = () => ({
    type: CLIENT_FETCH_DRAWING_OPERATIVES_REQUEST
});

export const clientFetchDrawingOperativesSuccess = payload => ({
    type: CLIENT_FETCH_DRAWING_OPERATIVES_SUCCESS,
    payload
});

export const clientFetchDrawingOperativesFailure = error => ({
    type: CLIENT_FETCH_DRAWING_OPERATIVES_FAILURE,
    error
});

export default (companyID, drawingID) => dispatch => {
    dispatch(clientFetchDrawingOperativesRequest(companyID, drawingID));

    return axios
        .get(
            `${CLIENT_API_URL}/pins/${companyID}/${drawingID}/operatives`,
            getHeaders()
        )
        .then(res => dispatch(clientFetchDrawingOperativesSuccess(res.data)))
        .catch(error => {
            dispatch(clientFetchDrawingOperativesFailure(error.message));
        });
};
