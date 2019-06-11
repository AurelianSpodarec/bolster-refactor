import axios from 'axios';
import { CLIENT_API_URL } from 'config/index';
import { getHeaders } from 'helpers/api';
import {
    CLIENT_FETCH_PIN_STATS_REQUEST,
    CLIENT_FETCH_PIN_STATS_SUCCESS,
    CLIENT_FETCH_PIN_STATS_FAILURE
} from 'constants/client/actionTypes/clientStats';

export const fetchClientPinStatsForLevelRequest = () => ({
    type: CLIENT_FETCH_PIN_STATS_REQUEST
});

export const fetchClientPinStatsForLevelSuccess = payload => ({
    type: CLIENT_FETCH_PIN_STATS_SUCCESS,
    payload
});

export const fetchClientPinStatsForLevelFailure = error => ({
    type: CLIENT_FETCH_PIN_STATS_FAILURE,
    error
});

export default (companyID, hierarchicyType, hierarchicalID) => dispatch => {
    dispatch(fetchClientPinStatsForLevelRequest());

    axios
        .get(
            `${CLIENT_API_URL}/stats/${companyID}/${hierarchicyType}/${hierarchicalID}`,
            getHeaders()
        )
        .then(res => dispatch(fetchClientPinStatsForLevelSuccess(res.data)))
        .catch(err =>
            dispatch(fetchClientPinStatsForLevelFailure(err.message))
        );
};
