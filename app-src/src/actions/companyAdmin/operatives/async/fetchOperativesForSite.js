import axios from 'axios';

import {
    FETCH_OPERATIVES_FOR_SITE_REQUEST,
    FETCH_OPERATIVES_FOR_SITE_SUCCESS,
    FETCH_OPERATIVES_FOR_SITE_FAILURE,
} from 'constants/actionTypes/operatives';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOperativesSiteRequest = () => ({
    type: FETCH_OPERATIVES_FOR_SITE_REQUEST,
});

export const fetchOperativesSiteSuccess = payload => ({
    type: FETCH_OPERATIVES_FOR_SITE_SUCCESS,
    payload,
});

export const fetchOperativesSiteFailure = error => ({
    type: FETCH_OPERATIVES_FOR_SITE_FAILURE,
    error,
});

export default siteID => dispatch => {
    dispatch(fetchOperativesSiteRequest());

    return axios
        .get(`${API_URL}/operativepermissions/site/${siteID}`, getHeaders())
        .then(res => dispatch(fetchOperativesSiteSuccess(res.data)))
        .catch(err => dispatch(fetchOperativesSiteFailure(err.message)));
};
