import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    EDIT_DROPDOWN_OPTION_REQUEST,
    EDIT_DROPDOWN_OPTION_SUCCESS,
    EDIT_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

export const editDropdownOptionRequest = () => ({
    type: EDIT_DROPDOWN_OPTION_REQUEST
});

export const editDropdownOptionSuccess = payload => ({
    type: EDIT_DROPDOWN_OPTION_SUCCESS,
    payload
});

export const editDropdownOptionFailure = error => ({
    type: EDIT_DROPDOWN_OPTION_FAILURE,
    error
});

export default (id, type, postBody) => dispatch => {
    dispatch(editDropdownOptionRequest());

    axios
        .post(
            `${API_URL}/dropdownoptions/${type}/${id}`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(editDropdownOptionSuccess(result.data)))
        .catch(error => {
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));

            return dispatch(editDropdownOptionFailure(error));
        });
};
