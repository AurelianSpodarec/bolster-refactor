import axios from 'axios';

import {
    FETCH_DATE_FORMATS_REQUEST,
    FETCH_DATE_FORMATS_SUCCESS,
    FETCH_DATE_FORMATS_FAILURE
} from 'constants/actionTypes/accounts';
import { getHeaders } from 'helpers/api';
import { AUTH_API_URL } from 'config';

export const fetchDateFormatsRequest = () => ({
    type: FETCH_DATE_FORMATS_REQUEST
});

export const fetchDateFormatsSuccess = payload => ({
    type: FETCH_DATE_FORMATS_SUCCESS,
    payload
});

export const fetchDateFormatsFailure = error => ({
    type: FETCH_DATE_FORMATS_FAILURE,
    error
});

export default () => dispatch => {
    dispatch(fetchDateFormatsRequest());

    axios
        .get(`${AUTH_API_URL}/localisation/dateformats`, getHeaders())
        .then(res => dispatch(fetchDateFormatsSuccess(res.data)))
        .catch(err => dispatch(fetchDateFormatsFailure(err.message)));
};
