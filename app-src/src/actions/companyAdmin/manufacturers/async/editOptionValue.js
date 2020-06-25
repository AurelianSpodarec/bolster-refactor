import axios from 'axios';

import { API_URL } from 'config';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_OPTION_VALUE_REQUEST,
    EDIT_OPTION_VALUE_SUCCESS,
    EDIT_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export const editOptionValueRequest = () => ({
    type: EDIT_OPTION_VALUE_REQUEST,
});

export const editOptionValueSuccess = (payload, manufacturerID) => ({
    type: EDIT_OPTION_VALUE_SUCCESS,
    payload,
    manufacturerID,
});

export const editOptionValueFailure = error => ({
    type: EDIT_OPTION_VALUE_FAILURE,
    error,
});

export default (manufacturerID, postBody) => dispatch => {
    dispatch(editOptionValueRequest());

    axios
        .patch(
            `${API_URL}/manufacturer/${manufacturerID}/optionvalues/${postBody.id}`,
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
