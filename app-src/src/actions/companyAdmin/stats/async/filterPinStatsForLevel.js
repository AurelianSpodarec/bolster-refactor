import axios from 'axios';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import {
    POST_FILTER_PIN_STATS_REQUEST,
    POST_FILTER_PIN_STATS_SUCCESS,
    POST_FILTER_PIN_STATS_FAILURE,
} from 'constants/actionTypes/stats';

export const filterPinStatsForLevelRequest = () => ({
    type: POST_FILTER_PIN_STATS_REQUEST,
});

export const filterPinStatsForLevelSuccess = payload => ({
    type: POST_FILTER_PIN_STATS_SUCCESS,
    payload,
});

export const filterPinStatsForLevelFailure = error => ({
    type: POST_FILTER_PIN_STATS_FAILURE,
    error,
});

export default (hierarchyID, hierarchyType, CompanyID, ServiceID) => dispatch => {
    dispatch(filterPinStatsForLevelRequest());

    axios
        .post(
            `${API_URL}/stats/filter`,
            {
                hierarchyID,
                hierarchyType,
                CompanyID,
                ServiceID,
            },
            getHeaders(),
        )
        .then(res => dispatch(filterPinStatsForLevelSuccess(res.data)))
        .catch(err => dispatch(filterPinStatsForLevelFailure(err.message)));
};
