import axios from 'axios';

import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_ALL_DRAWINGS_REQUEST,
    CLIENT_FETCH_ALL_DRAWINGS_SUCCESS,
    CLIENT_FETCH_ALL_DRAWINGS_FAILURE
} from 'constants/client/actionTypes/clientDrawings';

export const clientFetchAllDrawingsRequest = () => ({
    type: CLIENT_FETCH_ALL_DRAWINGS_REQUEST
});

export const clientFetchAllDrawingsSuccess = payload => ({
    type: CLIENT_FETCH_ALL_DRAWINGS_SUCCESS,
    payload
});

export const clientFetchAllDrawingsFailure = error => ({
    type: CLIENT_FETCH_ALL_DRAWINGS_FAILURE,
    error
});

export default companyID => dispatch => {
    dispatch(clientFetchAllDrawingsRequest());

    axios
        .get(`${CLIENT_API_URL}/drawings/${companyID}`, getHeaders())
        .then(res => dispatch(clientFetchAllDrawingsSuccess(res.data)))
        .catch(err => dispatch(clientFetchAllDrawingsFailure(err.message)));
};
