import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    UNDO_MANUFACTURER_REQUEST,
    UNDO_MANUFACTURER_SUCCESS,
    UNDO_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export const enableManufacturerRequest = () => ({
    type: UNDO_MANUFACTURER_REQUEST,
});

export const enableManufacturerSuccess = (payload, pinOptionType) => ({
    type: UNDO_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const enableManufacturerFailure = error => ({
    type: UNDO_MANUFACTURER_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(enableManufacturerRequest());

    axios
        .delete(`${API_URL}/manufacturer/delete/${id}?undo=true`, getHeaders())
        .then(({ data }) => dispatch(enableManufacturerSuccess(data)))
        .catch(error => {
            dispatch(enableManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
