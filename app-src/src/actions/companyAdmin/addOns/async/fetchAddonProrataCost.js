import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

import {
    FETCH_ADDON_PRORATA_COST_REQUEST,
    FETCH_ADDON_PRORATA_COST_SUCCESS,
    FETCH_ADDON_PRORATA_COST_FAILURE,
} from 'constants/actionTypes/addOns';

export const fetchAddonProrataCostRequest = () => ({
    type: FETCH_ADDON_PRORATA_COST_REQUEST,
});

export const fetchAddonProrataCostSuccess = payload => ({
    type: FETCH_ADDON_PRORATA_COST_SUCCESS,
    payload,
});

export const fetchAddonProrataCostFailure = error => ({
    type: FETCH_ADDON_PRORATA_COST_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(fetchAddonProrataCostRequest());

    axios
        .get(`${API_URL}/subscriptions/addonproratacost/${id}`, getHeaders())
        .then(res => dispatch(fetchAddonProrataCostSuccess(res.data)))
        .catch(err => dispatch(fetchAddonProrataCostFailure(err.message)));
};
