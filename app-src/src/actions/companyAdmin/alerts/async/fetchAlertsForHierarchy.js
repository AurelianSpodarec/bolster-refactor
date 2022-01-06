import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    FETCH_HIERARCHY_ALERTS_REQUEST,
    FETCH_HIERARCHY_ALERTS_SUCCESS,
    FETCH_HIERARCHY_ALERTS_FAILURE,
} from 'constants/actionTypes/alerts';

export const fetchHierarchyAlertsRequest = () => ({
    type: FETCH_HIERARCHY_ALERTS_REQUEST,
});

export const fetchHierarchyAlertsSuccess = payload => ({
    type: FETCH_HIERARCHY_ALERTS_SUCCESS,
    payload,
});

export const fetchHierarchyAlertsFailure = error => ({
    type: FETCH_HIERARCHY_ALERTS_FAILURE,
    error,
});

export const fetchHierarchyAlerts = (hierarchyType, hierarchyID) => async dispatch => {
    dispatch(fetchHierarchyAlertsRequest());

    try {
        const { data } = await axios.get(
            `${API_URL}/alerts/${hierarchyType}/${hierarchyID}`,
            getHeaders(),
        );

        dispatch(fetchHierarchyAlertsSuccess(data));
    } catch (error) {
        dispatch(handleErrors(fetchHierarchyAlertsFailure(error)));
    }
};
