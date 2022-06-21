import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ALL_WORKING_HOURS_REQUEST,
    FETCH_ALL_WORKING_HOURS_FAILURE,
    FETCH_ALL_WORKING_HOURS_SUCCESS,
} from 'constants/actionTypes/workingHours';

export const fetchAllWorkingHoursRequest = () => ({
    type: FETCH_ALL_WORKING_HOURS_REQUEST,
});

export const fetchAllWorkingHoursSuccess = payload => ({
    type: FETCH_ALL_WORKING_HOURS_SUCCESS,
    payload,
});

export const fetchAllWorkingHoursFailure = error => ({
    type: FETCH_ALL_WORKING_HOURS_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchAllWorkingHoursRequest());
    axios
        .get(`${API_URL}/workinghours/company`, getHeaders())
        .then(res => dispatch(fetchAllWorkingHoursSuccess(res.data)))
        .catch(err => dispatch(fetchAllWorkingHoursFailure(err.message)));
};
