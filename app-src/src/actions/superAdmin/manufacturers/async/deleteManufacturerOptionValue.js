import axios from 'axios';

import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    SA_DELETE_MANUFACTURER_OPTION_VALUE_REQUEST,
    SA_DELETE_MANUFACTURER_OPTION_VALUE_SUCCESS,
    SA_DELETE_MANUFACTURER_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';
import { ADMIN_API_URL } from 'config';

export const deleteManufacturerOptionValueRequest = () => ({
    type: SA_DELETE_MANUFACTURER_OPTION_VALUE_REQUEST,
});

export const deleteManufacturerOptionValueSuccess = (manufacturerID, optionValueID) => ({
    type: SA_DELETE_MANUFACTURER_OPTION_VALUE_SUCCESS,
    manufacturerID,
    optionValueID,
});

export const deleteManufacturerOptionValueFailure = error => ({
    type: SA_DELETE_MANUFACTURER_OPTION_VALUE_FAILURE,
    error,
});

export default optionValue => dispatch => {
    console.log({ optionValue });
    dispatch(deleteManufacturerOptionValueRequest());

    axios
        .delete(
            `${ADMIN_API_URL}/manufacturer/${optionValue.manufacturerID}/optionValues/${optionValue.id}`,
            getHeaders(),
        )
        .then(() =>
            dispatch(
                deleteManufacturerOptionValueSuccess(optionValue.manufacturerID, optionValue.id),
            ),
        )
        .catch(error => {
            dispatch(deleteManufacturerOptionValueFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
