import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    FETCH_PIN_STATS_REQUEST,
    FETCH_PIN_STATS_SUCCESS,
    FETCH_PIN_STATS_FAILURE
} from 'constants/actionTypes/stats';

export const fetchPinStatsForLevelRequest = () => ({
    type: FETCH_PIN_STATS_REQUEST
});

export const fetchPinStatsForLevelSuccess = payload => ({
    type: FETCH_PIN_STATS_SUCCESS,
    payload
});

export const fetchPinStatsForLevelFailure = error => ({
    type: FETCH_PIN_STATS_FAILURE,
    error
});

export default (hierarchicyType, hierarchicalID) => dispatch => {
    dispatch(fetchPinStatsForLevelRequest());

    axios
        .get(
            `${API_URL}/stats/${hierarchicyType}/${hierarchicalID}`,
            getHeaders()
        )
        .then(res => dispatch(fetchPinStatsForLevelSuccess(res.data)))
        .catch(err => dispatch(fetchPinStatsForLevelFailure(err.message)));
};
