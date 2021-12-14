import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    SA_DISABLE_MANUFACTURER_REQUEST,
    SA_DISABLE_MANUFACTURER_SUCCESS,
    SA_DISABLE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';

export const disableManufacturerRequest = () => ({
    type: SA_DISABLE_MANUFACTURER_REQUEST,
});

export const disableManufacturerSuccess = (id, payload) => ({
    type: SA_DISABLE_MANUFACTURER_SUCCESS,
    id,
    payload,
    pinOptionType: payload.pinOptionType,
});

export const disableManufacturerFailure = error => ({
    type: SA_DISABLE_MANUFACTURER_FAILURE,
    error,
});

export default manufacturer => dispatch => {
    dispatch(disableManufacturerRequest());

    axios
        .put(`${ADMIN_API_URL}/manufacturer/${manufacturer.id}/disable`, {}, getHeaders())
        .then(() => dispatch(disableManufacturerSuccess(manufacturer.id, manufacturer)))
        .catch(error => {
            dispatch(disableManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
