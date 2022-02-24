import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    DELETE_MANUFACTURER_REQUEST,
    DELETE_MANUFACTURER_SUCCESS,
    DELETE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export const deleteManufacturerRequest = () => ({
    type: DELETE_MANUFACTURER_REQUEST,
});

export const deleteManufacturerSuccess = (id, payload) => ({
    type: DELETE_MANUFACTURER_SUCCESS,
    id,
    payload,
    pinOptionType: payload.pinOptionType,
});

export const deleteManufacturerFailure = error => ({
    type: DELETE_MANUFACTURER_FAILURE,
    error,
});

export default manufacturer => dispatch => {
    dispatch(deleteManufacturerRequest());

    axios
        .delete(`${API_URL}/manufacturer/delete/${manufacturer.id}?undo=false`, getHeaders())
        .then(({ data }) => dispatch(deleteManufacturerSuccess(manufacturer.id, manufacturer)))
        .catch(error => {
            dispatch(deleteManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
