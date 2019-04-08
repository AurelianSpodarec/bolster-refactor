import axios from 'axios';

import { API_URL } from 'config/index';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import { getHeaders } from 'helpers/api';

import {
    EDIT_COMPANY_PERMISSIONS_REQUEST,
    EDIT_COMPANY_PERMISSIONS_SUCCESS,
    EDIT_COMPANY_PERMISSIONS_FAILURE
} from 'constants/actionTypes/companies';

export const editCompanyPermissionsRequest = () => ({
    type: EDIT_COMPANY_PERMISSIONS_REQUEST
});

export const editCompanyPermissionsSuccess = payload => ({
    type: EDIT_COMPANY_PERMISSIONS_SUCCESS,
    payload,
    id: payload.id
});

export const editCompanyPermissionsFailure = error => ({
    type: EDIT_COMPANY_PERMISSIONS_FAILURE,
    error
});

export default (hierarchicalLevel, hierarchicalID, postBody) => dispatch => {
    console.log(postBody);
    dispatch(editCompanyPermissionsRequest());

    axios
        .post(
            `${API_URL}/companypermissions/${hierarchicalLevel}/${hierarchicalID}`,
            postBody,
            getHeaders()
        )
        .then(result => dispatch(editCompanyPermissionsSuccess(result.data)))
        .catch(error => {
            dispatch(editCompanyPermissionsFailure(error));
            if (error.response.status === 400)
                dispatch(setAPIFieldErrors(error.response.data.errors));
        });
};
