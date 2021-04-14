import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    DISABLE_MANUFACTURER_REQUEST,
    DISABLE_MANUFACTURER_SUCCESS,
    DISABLE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export const disableManufacturerRequest = () => ({
    type: DISABLE_MANUFACTURER_REQUEST,
});

export const disableManufacturerSuccess = (payload, pinOptionType) => ({
    type: DISABLE_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const disableManufacturerFailure = error => ({
    type: DISABLE_MANUFACTURER_FAILURE,
    error,
});

export default id => dispatch => {
    dispatch(disableManufacturerRequest());

    axios
        .delete(`${API_URL}/manufacturer/${id}/disable`, getHeaders())
        .then(({ data }) => dispatch(disableManufacturerSuccess(data)))
        .catch(error => {
            dispatch(disableManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
