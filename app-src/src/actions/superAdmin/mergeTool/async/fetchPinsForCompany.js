import axios from 'axios';

import {
    ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST,
    ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS,
    ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE,
} from 'constants/actionTypes/pins';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const adminFetchPinsForCompanyRequest = () => ({
    type: ADMIN_FETCH_PINS_FOR_COMPANY_REQUEST,
});

export const adminFetchPinsForCompanySuccess = payload => ({
    type: ADMIN_FETCH_PINS_FOR_COMPANY_SUCCESS,
    payload,
});

export const adminFetchPinsForCompanyFailure = error => ({
    type: ADMIN_FETCH_PINS_FOR_COMPANY_FAILURE,
    error,
});

export default drawingID => dispatch => {
    dispatch(adminFetchPinsForCompanyRequest());

    return axios
        .get(`${ADMIN_API_URL}/drawings/4/${drawingID}/pins`, getHeaders())
        .then(res => dispatch(adminFetchPinsForCompanySuccess(res.data)))
        .catch(err => dispatch(adminFetchPinsForCompanyFailure(err.message)));
};
