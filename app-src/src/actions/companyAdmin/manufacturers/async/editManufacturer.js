import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_MANUFACTURER_REQUEST,
    EDIT_MANUFACTURER_SUCCESS,
    EDIT_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export const editManufacturerRequest = () => ({
    type: EDIT_MANUFACTURER_REQUEST,
});

export const editManufacturerSuccess = (payload, pinOptionType) => ({
    type: EDIT_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const editManufacturerFailure = error => ({
    type: EDIT_MANUFACTURER_FAILURE,
    error,
});

export default (pinOptionType, postBody) => dispatch => {
    dispatch(editManufacturerRequest());

    axios
        .patch(`${API_URL}/manufacturer`, postBody, getHeaders())
        .then(({ data }) => dispatch(editManufacturerSuccess(data, pinOptionType)))
        .catch(error => {
            dispatch(editManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
