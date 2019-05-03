import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';
import {
    CREATE_DROPDOWN_OPTION_REQUEST,
    CREATE_DROPDOWN_OPTION_SUCCESS,
    CREATE_DROPDOWN_OPTION_FAILURE
} from 'constants/actionTypes/dropdownOptions';

export const createDropdownOptionRequest = () => ({
    type: CREATE_DROPDOWN_OPTION_REQUEST
});

export const createDropdownOptionSuccess = payload => ({
    type: CREATE_DROPDOWN_OPTION_SUCCESS,
    payload
});

export const createDropdownOptionFailure = error => ({
    type: CREATE_DROPDOWN_OPTION_FAILURE,
    error
});

export default (type, postBody) => dispatch => {
    dispatch(createDropdownOptionRequest());

    axios
        .post(`${API_URL}/dropdownoptions/${type}`, postBody, getHeaders())
        .then(result => dispatch(createDropdownOptionSuccess(result.data)))
        .catch(error => {
            dispatch(createDropdownOptionFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
