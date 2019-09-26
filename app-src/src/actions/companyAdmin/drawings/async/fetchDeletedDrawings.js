import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_DELETED_DRAWINGS_REQUEST,
    FETCH_DELETED_DRAWINGS_SUCCESS,
    FETCH_DELETED_DRAWINGS_FAILURE
} from 'constants/actionTypes/deletedData';

export const fetchDeletedDrawingsRequest = () => ({
    type: FETCH_DELETED_DRAWINGS_REQUEST
});

export const fetchDeletedDrawingsSuccess = payload => ({
    type: FETCH_DELETED_DRAWINGS_SUCCESS,
    payload
});

export const fetchDeletedDrawingsFailure = error => ({
    type: FETCH_DELETED_DRAWINGS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchDeletedDrawingsRequest());

    axios
        .get(`${API_URL}/drawings/deleted`, getHeaders())
        .then(res => dispatch(fetchDeletedDrawingsSuccess(res.data)))
        .catch(err => dispatch(fetchDeletedDrawingsFailure(err.message)));
};
