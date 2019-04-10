import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_COST_OF_CREDITS_REQUEST,
    FETCH_COST_OF_CREDITS_SUCCESS,
    FETCH_COST_OF_CREDITS_FAILURE
} from 'constants/actionTypes/credits';

export const fetchCostOfCreditsRequest = () => ({
    type: FETCH_COST_OF_CREDITS_REQUEST
});

export const fetchCostOfCreditsSuccess = payload => ({
    type: FETCH_COST_OF_CREDITS_SUCCESS,
    payload
});

export const fetchCostOfCreditsFailure = error => ({
    type: FETCH_COST_OF_CREDITS_FAILURE,
    error
});

export default (credits = 1) => dispatch => {
    dispatch(fetchCostOfCreditsRequest());

    axios
        .get(
            `${API_URL}/subscriptions/creditcost?credits=${credits}`,
            getHeaders()
        )
        .then(res => dispatch(fetchCostOfCreditsSuccess(res.data)))
        .catch(err => dispatch(fetchCostOfCreditsFailure(err.message)));
};
