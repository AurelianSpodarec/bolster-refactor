import axios from 'axios';

import {
    FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
    FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchOptionValuesByManufacturerRequest = () => ({
    type: FETCH_OPTION_VALUES_BY_MANUFACTURER_REQUEST,
});

export const fetchOptionValuesByManufacturerSuccess = (payload, manufacturerID) => ({
    type: FETCH_OPTION_VALUES_BY_MANUFACTURER_SUCCESS,
    payload,
    manufacturerID,
});

export const fetchOptionValuesByManufacturerFailure = error => ({
    type: FETCH_OPTION_VALUES_BY_MANUFACTURER_FAILURE,
    error,
});

export default manufacturerID => dispatch => {
    dispatch(fetchOptionValuesByManufacturerRequest());

    return axios
        .get(`${API_URL}/manufacturer/${manufacturerID}/optionvalues`, getHeaders())
        .then(res => dispatch(fetchOptionValuesByManufacturerSuccess(res.data, manufacturerID)))
        .catch(err => dispatch(fetchOptionValuesByManufacturerFailure(err.message)));
};
