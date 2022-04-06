import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_OPTION_SETS_REQUEST,
    FETCH_PIN_OPTION_SETS_SUCCESS,
    FETCH_PIN_OPTION_SETS_FAILURE,
} from 'constants/actionTypes/pinOptions';

export const fetchPinOptionSetsRequest = () => ({
    type: FETCH_PIN_OPTION_SETS_REQUEST,
});

export const fetchPinOptionSetsSuccess = payload => ({
    type: FETCH_PIN_OPTION_SETS_SUCCESS,
    payload,
});

export const fetchPinOptionSetsFailure = error => ({
    type: FETCH_PIN_OPTION_SETS_FAILURE,
    error,
});

export default typeID => async dispatch => {
    dispatch(fetchPinOptionSetsRequest());

    return axios
        .get(`${API_URL}/pinoptions/types/${typeID}/sets`, getHeaders())
        .then(res => dispatch(fetchPinOptionSetsSuccess(res.data)))
        .catch(err => dispatch(fetchPinOptionSetsFailure(err.message)));
};
