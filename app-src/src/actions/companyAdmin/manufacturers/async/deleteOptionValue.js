import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    DELETE_OPTION_VALUE_REQUEST,
    DELETE_OPTION_VALUE_SUCCESS,
    DELETE_OPTION_VALUE_FAILURE,
} from 'constants/actionTypes/companyAdminManufacturers';

export const deleteOptionValueRequest = () => ({
    type: DELETE_OPTION_VALUE_REQUEST,
});

export const deleteOptionValueSuccess = (id, payload) => ({
    type: DELETE_OPTION_VALUE_SUCCESS,
    id,
    payload,
});

export const deleteOptionValueFailure = error => ({
    type: DELETE_OPTION_VALUE_FAILURE,
    error,
});

export default optionValue => dispatch => {
    dispatch(deleteOptionValueRequest());

    axios
        .delete(
            `${API_URL}/manufacturer/delete/optionvalue/${optionValue.id}?undo=false`,
            getHeaders(),
        )
        .then(({ data }) =>
            dispatch(deleteOptionValueSuccess(optionValue.manufacturerID, optionValue)),
        )
        .catch(error => {
            dispatch(deleteOptionValueFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
