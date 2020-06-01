import axios from 'axios';

import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_TEMPLATES_FOR_DRAWING_REQUEST,
    CLIENT_FETCH_TEMPLATES_FOR_DRAWING_SUCCESS,
    CLIENT_FETCH_TEMPLATES_FOR_DRAWING_FAILURE
} from 'constants/client/actionTypes/clientTemplates';
import { CLIENT_API_URL } from 'config';

export const clientFetchTemplatesForDrawingRequest = () => ({
    type: CLIENT_FETCH_TEMPLATES_FOR_DRAWING_REQUEST
});

export const clientFetchTemplatesForDrawingSuccess = payload => ({
    type: CLIENT_FETCH_TEMPLATES_FOR_DRAWING_SUCCESS,
    payload
});

export const clientFetchTemplatesForDrawingFailure = error => ({
    type: CLIENT_FETCH_TEMPLATES_FOR_DRAWING_FAILURE,
    error
});

export default (companyID, drawingID) => dispatch => {
    dispatch(clientFetchTemplatesForDrawingRequest());

    return axios
        .get(`${CLIENT_API_URL}/templates/${companyID}/${drawingID}`, getHeaders())
        .then(res => dispatch(clientFetchTemplatesForDrawingSuccess(res.data)))
        .catch(err => dispatch(clientFetchTemplatesForDrawingFailure(err.message)));
};
