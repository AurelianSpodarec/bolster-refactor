import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SINGLE_DRAWING_REQUEST,
    CLIENT_FETCH_SINGLE_DRAWING_SUCCESS,
    CLIENT_FETCH_SINGLE_DRAWING_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

export const clientFetchDrawingRequest = () => ({
    type: CLIENT_FETCH_SINGLE_DRAWING_REQUEST
});

export const clientFetchDrawingSuccess = payload => ({
    type: CLIENT_FETCH_SINGLE_DRAWING_SUCCESS,
    payload
});

export const clientFetchDrawingFailure = error => ({
    type: CLIENT_FETCH_SINGLE_DRAWING_FAILURE,
    error
});

export default (companyID, drawingID) => dispatch => {
    dispatch(clientFetchDrawingRequest());

    axios
        .get(
            `${CLIENT_API_URL}/drawings/${companyID}/${drawingID}`,
            getHeaders()
        )
        .then(({ data }) => dispatch(clientFetchDrawingSuccess(data)))
        .catch(err => dispatch(clientFetchDrawingFailure(err.message)));
};
