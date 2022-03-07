import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    SA_DELETE_MANUFACTURER_REQUEST,
    SA_DELETE_MANUFACTURER_SUCCESS,
    SA_DELETE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';

export const deleteManufacturerRequest = () => ({
    type: SA_DELETE_MANUFACTURER_REQUEST,
});

export const deleteManufacturerSuccess = (id, payload) => ({
    type: SA_DELETE_MANUFACTURER_SUCCESS,
    id,
    payload,
    pinOptionType: payload.pinOptionType,
});

export const deleteManufacturerFailure = error => ({
    type: SA_DELETE_MANUFACTURER_FAILURE,
    error,
});

export default manufacturer => dispatch => {
    dispatch(deleteManufacturerRequest());

    axios
        .delete(`${ADMIN_API_URL}/manufacturer/${manufacturer.id}`, getHeaders())
        .then(() => dispatch(deleteManufacturerSuccess(manufacturer.id, manufacturer)))
        .catch(error => {
            dispatch(deleteManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
