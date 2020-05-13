import axios from 'axios';

import { ADMIN_API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    SA_EDIT_OPTION_VALUE_REQUEST,
    SA_EDIT_OPTION_VALUE_SUCCESS,
    SA_EDIT_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/superAdminManufacturers';

export const editOptionValueRequest = () => ({
    type: SA_EDIT_OPTION_VALUE_REQUEST,
});

export const editOptionValueSuccess = (payload, manufacturerID) => ({
    type: SA_EDIT_OPTION_VALUE_SUCCESS,
    payload,
    manufacturerID,
});

export const editOptionValueFailure = error => ({
    type: SA_EDIT_OPTION_VALUE_FAILURE,
    error,
});

export default (manufacturerID, postBody) => dispatch => {
    dispatch(editOptionValueRequest());

    axios
        .patch(
            `${ADMIN_API_URL}/manufacturer/${manufacturerID}/optionvalues`,
            postBody,
            getHeaders(),
        )
        .then(({ data }) => dispatch(editOptionValueSuccess(data, manufacturerID)))
        .catch(error => {
            dispatch(editOptionValueFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
