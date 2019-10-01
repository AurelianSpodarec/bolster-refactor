import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DELETED_PIN_HISTORIES_REQUEST,
    FETCH_DELETED_PIN_HISTORIES_SUCCESS,
    FETCH_DELETED_PIN_HISTORIES_FAILURE
} from 'constants/actionTypes/deletedData';

export const fetchDeletedPinHistoriesRequest = () => ({
    type: FETCH_DELETED_PIN_HISTORIES_REQUEST
});

export const fetchDeletedPinHistoriesSuccess = payload => ({
    type: FETCH_DELETED_PIN_HISTORIES_SUCCESS,
    payload
});

export const fetchDeletedPinHistoriesFailure = error => ({
    type: FETCH_DELETED_PIN_HISTORIES_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchDeletedPinHistoriesRequest());

    axios
        .get(`${API_URL}/pins/histories/deleted`, getHeaders())
        .then(res => dispatch(fetchDeletedPinHistoriesSuccess(res.data)))
        .catch(err => dispatch(fetchDeletedPinHistoriesFailure(err.message)));
};
