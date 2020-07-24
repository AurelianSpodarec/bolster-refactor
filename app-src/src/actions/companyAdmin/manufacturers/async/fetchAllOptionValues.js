import axios from 'axios';

import {
    FETCH_ALL_OPTION_VALUES_REQUEST,
    FETCH_ALL_OPTION_VALUES_SUCCESS,
    FETCH_ALL_OPTION_VALUES_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOptionValuesByManufacturerRequest = () => ({
    type: FETCH_ALL_OPTION_VALUES_REQUEST,
});

export const fetchOptionValuesByManufacturerSuccess = payload => ({
    type: FETCH_ALL_OPTION_VALUES_SUCCESS,
    payload,
});

export const fetchOptionValuesByManufacturerFailure = error => ({
    type: FETCH_ALL_OPTION_VALUES_FAILURE,
    error,
});

export default () => dispatch => {
    dispatch(fetchOptionValuesByManufacturerRequest());

    return axios
        .get(`${API_URL}/manufacturer/optionvalues/all`, getHeaders())
        .then(res => dispatch(fetchOptionValuesByManufacturerSuccess(res.data)))
        .catch(err => dispatch(fetchOptionValuesByManufacturerFailure(err.message)));
};
