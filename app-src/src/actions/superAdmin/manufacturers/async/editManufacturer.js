import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    SA_EDIT_MANUFACTURER_REQUEST,
    SA_EDIT_MANUFACTURER_SUCCESS,
    SA_EDIT_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';

export const editManufacturerRequest = () => ({
    type: SA_EDIT_MANUFACTURER_REQUEST,
});

export const editManufacturerSuccess = (payload, pinOptionType) => ({
    type: SA_EDIT_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const editManufacturerFailure = error => ({
    type: SA_EDIT_MANUFACTURER_FAILURE,
    error,
});

export default (pinOptionType, postBody) => dispatch => {
    dispatch(editManufacturerRequest());

    axios
        .patch(`${ADMIN_API_URL}/manufacturer`, postBody, getHeaders())
        .then(({ data }) => dispatch(editManufacturerSuccess(data, pinOptionType)))
        .catch(error => {
            dispatch(editManufacturerFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
