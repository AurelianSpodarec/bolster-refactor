import axios from 'axios';
import {
    SA_CREATE_MANUFACTURER_REQUEST,
    SA_CREATE_MANUFACTURER_SUCCESS,
    SA_CREATE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';

export const createManufacturerRequest = () => ({
    type: SA_CREATE_MANUFACTURER_REQUEST,
});

export const createManufacturerSuccess = (payload, pinOptionType) => ({
    type: SA_CREATE_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const createManufacturerFailure = error => ({
    type: SA_CREATE_MANUFACTURER_FAILURE,
    error,
});

export default (pinOptionType, postBody) => dispatch => {
    dispatch(createManufacturerRequest());
    return axios
        .post(`${ADMIN_API_URL}/manufacturer`, postBody, getHeaders())
        .then(({ data }) => dispatch(createManufacturerSuccess(data, pinOptionType)))
        .catch(err => {
            dispatch(createManufacturerFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
