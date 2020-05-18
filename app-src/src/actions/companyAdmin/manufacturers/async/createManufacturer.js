import axios from 'axios';
import {
    CREATE_MANUFACTURER_REQUEST,
    CREATE_MANUFACTURER_SUCCESS,
    CREATE_MANUFACTURER_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { API_URL } from 'config';

export const createManufacturerRequest = () => ({
    type: CREATE_MANUFACTURER_REQUEST,
});

export const createManufacturerSuccess = (payload, pinOptionType) => ({
    type: CREATE_MANUFACTURER_SUCCESS,
    payload,
    pinOptionType,
});

export const createManufacturerFailure = error => ({
    type: CREATE_MANUFACTURER_FAILURE,
    error,
});

export default (pinOptionType, postBody) => dispatch => {
    dispatch(createManufacturerRequest());
    return axios
        .post(`${API_URL}/manufacturer`, postBody, getHeaders())
        .then(({ data }) => dispatch(createManufacturerSuccess(data, pinOptionType)))
        .catch(err => {
            dispatch(createManufacturerFailure(err.message));

            if (err.response.status === 400) {
                dispatch(setAPIFieldErrors(err.response.data.errors));
            }
        });
};
