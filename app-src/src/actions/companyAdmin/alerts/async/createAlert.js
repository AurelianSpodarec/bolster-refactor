import axios from 'axios';

import { API_URL } from 'config';
import { getHeaders, handleErrors } from 'helpers/api';

import {
    CREATE_ALERT_REQUEST,
    CREATE_ALERT_SUCCESS,
    CREATE_ALERT_FAILURE,
} from 'constants/actionTypes/alerts';

export const createAlertRequest = () => ({
    type: CREATE_ALERT_REQUEST,
});

export const createAlertSuccess = payload => ({
    type: CREATE_ALERT_SUCCESS,
    payload,
});

export const createAlertFailure = error => ({
    type: CREATE_ALERT_FAILURE,
    error,
});

export default (hierarchyType, hierarchyID, postBody) => async dispatch => {
    dispatch(createAlertRequest());

    try {
        const { data } = await axios.post(
            `${API_URL}/alerts/${hierarchyType}/${hierarchyID}`,
            postBody,
            getHeaders(),
        );

        dispatch(createAlertSuccess(data));
    } catch (error) {
        dispatch(handleErrors(createAlertFailure)(error));
    }
};
