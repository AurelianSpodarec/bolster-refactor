import axios from 'axios';

import {
    FETCH_PERMISSIONS_FOR_COMPANY_PERMISSION_REQUEST,
    FETCH_PERMISSIONS_FOR_COMPANY_PERMISSION_SUCCESS,
    FETCH_PERMISSIONS_FOR_COMPANY_PERMISSION_FAILURE,
} from 'constants/actionTypes/companiesWithPermissions';
import { API_URL } from 'config';
import { getHeaders } from 'helpers/api';

export const fetchPermissionsForCompanyPermissionRequest = () => ({
    type: FETCH_PERMISSIONS_FOR_COMPANY_PERMISSION_REQUEST,
});

export const fetchPermissionsForCompanyPermissionSuccess = payload => ({
    type: FETCH_PERMISSIONS_FOR_COMPANY_PERMISSION_SUCCESS,
    payload,
});

export const fetchPermissionsForCompanyPermissionFailure = error => ({
    type: FETCH_PERMISSIONS_FOR_COMPANY_PERMISSION_FAILURE,
    error,
});

export default (hierarchyType, hierarchyID, companyID) => dispatch => {
    dispatch(fetchPermissionsForCompanyPermissionRequest());
    return axios
        .get(
            `${API_URL}/companypermissions/${hierarchyType}/${hierarchyID}/${companyID}`,
            getHeaders(),
        )
        .then(res => dispatch(fetchPermissionsForCompanyPermissionSuccess(res.data)))
        .catch(err => dispatch(fetchPermissionsForCompanyPermissionFailure(err.message)));
};
