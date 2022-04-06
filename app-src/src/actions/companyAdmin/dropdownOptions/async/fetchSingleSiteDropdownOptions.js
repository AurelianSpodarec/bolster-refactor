import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_SINGLE_SITE_PIN_OPTION_TYPES_REQUEST,
    FETCH_SINGLE_SITE_PIN_OPTION_TYPES_SUCCESS,
    FETCH_SINGLE_SITE_PIN_OPTION_TYPES_FAILURE,
} from 'constants/actionTypes/dropdownOptions';

export const fetchSingleSiteDropdownOptionsRequest = () => ({
    type: FETCH_SINGLE_SITE_PIN_OPTION_TYPES_REQUEST,
});

export const fetchSingleSiteDropdownOptionsSuccess = payload => ({
    type: FETCH_SINGLE_SITE_PIN_OPTION_TYPES_SUCCESS,
    payload,
});

export const fetchSingleSiteDropdownOptionsFailure = error => ({
    type: FETCH_SINGLE_SITE_PIN_OPTION_TYPES_FAILURE,
    error,
});

export default (type, siteID) => dispatch => {
    dispatch(fetchSingleSiteDropdownOptionsRequest());

    axios
        .get(`${API_URL}/dropdownoptions/${type}/site/${siteID}`, getHeaders())
        .then(res => dispatch(fetchSingleSiteDropdownOptionsSuccess(res.data)))
        .catch(err => dispatch(fetchSingleSiteDropdownOptionsFailure(err.message)));
};
