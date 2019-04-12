import axios from 'axios';

import {
    EDIT_COMPANY_SETTINGS_REQUEST,
    EDIT_COMPANY_SETTINGS_SUCCESS,
    EDIT_COMPANY_SETTINGS_FAILURE
} from 'constants/actionTypes/companySettings';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const editCompanySettingsRequest = () => ({
    type: EDIT_COMPANY_SETTINGS_REQUEST
});

export const editCompanySettingsSuccess = payload => ({
    type: EDIT_COMPANY_SETTINGS_SUCCESS,
    payload
});

export const editCompanySettingsFailure = error => ({
    type: EDIT_COMPANY_SETTINGS_FAILURE,
    error
});

export default postBody => dispatch => {
    dispatch(editCompanySettingsRequest());

    axios
        .post(`${API_URL}/settings`, postBody, getHeaders())
        .then(res => dispatch(editCompanySettingsSuccess(res.data)))
        .catch(err => dispatch(editCompanySettingsFailure(err.message)));
};
