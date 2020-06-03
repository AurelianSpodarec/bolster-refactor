import axios from 'axios';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_SERVICES_FOR_DRAWING_REQUEST,
    CLIENT_FETCH_SERVICES_FOR_DRAWING_SUCCESS,
    CLIENT_FETCH_SERVICES_FOR_DRAWING_FAILURE,
} from 'constants/client/actionTypes/clientServices';

export const clientFetchServicesForDrawingRequest = () => ({
    type: CLIENT_FETCH_SERVICES_FOR_DRAWING_REQUEST,
});

export const clientFetchServicesForDrawingSuccess = payload => ({
    type: CLIENT_FETCH_SERVICES_FOR_DRAWING_SUCCESS,
    payload,
});

export const clientFetchServicesForDrawingFailure = error => ({
    type: CLIENT_FETCH_SERVICES_FOR_DRAWING_FAILURE,
    error,
});

export default drawingID => dispatch => {
    dispatch(clientFetchServicesForDrawingRequest());

    return axios
        .get(`${CLIENT_API_URL}/services/drawing/${drawingID}`, getHeaders())
        .then(({ data }) => dispatch(clientFetchServicesForDrawingSuccess(data)))
        .catch(err => dispatch(clientFetchServicesForDrawingFailure(err.message)));
};
