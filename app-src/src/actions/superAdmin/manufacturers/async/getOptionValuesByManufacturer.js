import axios from 'axios';

import {
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOptionValuesByManufacturerRequest = () => ({
    type: SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
});

export const fetchOptionValuesByManufacturerSuccess = (payload, manufacturerID) => ({
    type: SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    payload,
    manufacturerID,
});

export const fetchOptionValuesByManufacturerFailure = error => ({
    type: SA_FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
    error,
});

export default manufacturerID => dispatch => {
    dispatch(fetchOptionValuesByManufacturerRequest());

    return axios
        .get(`${ADMIN_API_URL}/manufacturer/${manufacturerID}/optionvalues`, getHeaders())
        .then(res => dispatch(fetchOptionValuesByManufacturerSuccess(res.data, manufacturerID)))
        .catch(err => dispatch(fetchOptionValuesByManufacturerFailure(err.message)));
};
