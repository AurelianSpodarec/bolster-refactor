import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_PIN_LOCATION_REQUEST,
    EDIT_PIN_LOCATION_SUCCESS,
    EDIT_PIN_LOCATION_FAILURE
} from 'constants/actionTypes/pins';

export const editPinLocationRequest = () => ({
    type: EDIT_PIN_LOCATION_REQUEST
});

export const editPinLocationSuccess = payload => ({
    type: EDIT_PIN_LOCATION_SUCCESS,
    payload
});

export const editPinLocationFailure = error => ({
    type: EDIT_PIN_LOCATION_FAILURE,
    error
});

export default (pinID, postBody) => dispatch => {
    dispatch(editPinLocationRequest());

    return axios
        .post(`${API_URL}/pins/${pinID}/move`, postBody, getHeaders())
        .then(result => dispatch(editPinLocationSuccess(result.data)))
        .catch(error => {
            dispatch(editPinLocationFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
