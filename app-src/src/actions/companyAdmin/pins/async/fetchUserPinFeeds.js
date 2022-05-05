import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_USER_PIN_FEEDS_REQUEST,
    FETCH_USER_PIN_FEEDS_SUCCESS,
    FETCH_USER_PIN_FEEDS_FAILURE,
} from 'constants/actionTypes/pins';

export const fetchuserPinFeedsRequest = () => ({
    type: FETCH_USER_PIN_FEEDS_REQUEST,
});

export const fetchuserPinFeedsSuccess = payload => ({
    type: FETCH_USER_PIN_FEEDS_SUCCESS,
    payload,
});

export const fetchuserPinFeedsFailure = error => ({
    type: FETCH_USER_PIN_FEEDS_FAILURE,
    error,
});

export default (userIDs, date, isWeek = false) =>
    dispatch => {
        dispatch(fetchuserPinFeedsRequest());

        return axios
            .post(`${API_URL}/pins/historyfeed/user`, { date, isWeek, ids: userIDs }, getHeaders())
            .then(res => dispatch(fetchuserPinFeedsSuccess(res.data)))
            .catch(err => dispatch(fetchuserPinFeedsFailure(err.message)));
    };
