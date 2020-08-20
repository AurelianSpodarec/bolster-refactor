import Axios from 'axios';

import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';
import setAPIFieldErrors from 'actions/shared/generic/fieldErrors/sync/setAPIFieldErrors';
import {
    EDIT_COMPANY_PERMISSIONS_REQUEST,
    EDIT_COMPANY_PERMISSIONS_SUCCESS,
    EDIT_COMPANY_PERMISSIONS_FAILURE,
} from 'constants/actionTypes/companiesWithPermissions';

export const editCompanyRequest = () => ({
    type: EDIT_COMPANY_PERMISSIONS_REQUEST,
});

export const editCompanySuccess = payload => ({
    type: EDIT_COMPANY_PERMISSIONS_SUCCESS,
    payload,
});

export const editCompanyFailure = error => ({
    type: EDIT_COMPANY_PERMISSIONS_FAILURE,
    error,
});

export default (hierarchyType, hierarchyID, postBody) => dispatch => {
    dispatch(editCompanyRequest());
    return Axios.post(
        `${API_URL}/companypermissions/${hierarchyType}/${hierarchyID}`,
        postBody,
        getHeaders(),
    )
        .then(({ data }) => dispatch(editCompanySuccess(data)))
        .catch(({ response, message }) => {
            response.status === 400
                ? dispatch(setAPIFieldErrors(response.data.errors))
                : dispatch(editCompanyFailure(message));
        });
};
